import {Lobby} from "./states/Lobby"
import {joinChannel} from "./common/channels"

export class Game extends Phaser.Game {

  // Initialize Phaser
  constructor(width, height, container) {
    super(width, height, Phaser.AUTO, container, null)

    // set up game state [name, class, autostart]
    this.state.add("lobby", Lobby, false)
  }

  start(socket) {
    socket.connect()

    // create and join the lobby channel
    const channel = socket.channel("games:lobby", {})

    joinChannel(channel, () => {
      console.log("Joined successfully")
      this.state.start("lobby", true, false, channel)
    })
  }
}
