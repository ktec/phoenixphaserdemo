import { createLabel } from "../common/labels"
import { createSyncLabel } from "../common/sync_labels"
import { leaveChannel } from "../common/channels"
import { createSprite } from "../common/sprites"
import { createPlayer } from "../common/players"
import { sharePosition,
         receivePosition,
         serializePosition } from "../common/sync"

export class Play extends Phaser.State {
  preload({load}) {
    load.image("square", "images/square.png")
    load.image("circle", "images/circle.png")
    load.image("triangle", "images/triangle.png")
    load.image("ground", "images/platform.png")
  }

  create(game) {
    game.stage.backgroundColor = 0x551A8B

    // this is really helpful FOR DEVELOPMENT ONLY
    // it prevents the canvas stopping rendering on focus
    this.stage.disableVisibilityChange = true

    // const label = createSyncLabel(this, "Move me!", this.channel, "1")

    const label2 = createLabel(this, "Click to return to Lobby")
    label2.anchor.setTo(0.5)
    label2.inputEnabled = true
    label2.y += 100
    label2.events.onInputDown.add(() =>
      leaveChannel(this.channel, game.gotoLobby)
    )

    // select and start the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.physics.arcade.sortDirection = Phaser.Physics.Arcade.BOTTOM_TOP

    const platforms = game.add.group()
    platforms.enableBody = true
    const ground = platforms.create(0, game.world.height - 32, "ground")
    ground.scale.setTo(2, 1)
    ground.body.immovable = true

    const ledge = platforms.create(400, 100, "ground")
    ledge.body.immovable = true

    const ledge2 = platforms.create(-150, 250, "ground")
    ledge2.body.immovable = true

    this.platforms = platforms

    this.other_players = game.add.group()
    this.other_players.enableBody = true

    this.channel.on("player:join", (player) => {
      const sprite = createSprite(game, player)
      receivePosition(sprite, this.channel)
      this.other_players.add(sprite)
    })

    this.channel.on("player:leave", ({id}) => {
      console.log("player:leave", id)
      if (id == this.id) { leaveChannel(this.channel, game.gotoLobby) }
      const sprite = this.other_players.children.find(sprite => {
        return sprite.id === id
      })
      if (sprite) { sprite.destroy() }
    })

    this.players.map((player) => {
      const sprite = createSprite(game, player)
      if (player.id == this.id) {
        this.player = createPlayer(game, sprite)
        sharePosition(sprite, this.channel)
      } else {
        this.other_players.add(sprite)
        receivePosition(sprite, this.channel)
      }
    })
  }

  update(game) {
    game.physics.arcade.collide(this.player, this.platforms)
    game.physics.arcade.overlap(this.player, this.other_players, (a, b) => {
      this.channel.push("collision", b.id)
    })
  }

  init(...options) {
    // console.log("starting Play state", options)
    const [channel, {id, players}] = options
    this.channel = channel
    console.log("Your player id is:", id)
    this.id = id
    this.players = players
  }
}
