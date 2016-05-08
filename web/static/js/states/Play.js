import { createLabel } from "../common/labels"
import { createSyncLabel } from "../common/sync_labels"
import { leaveChannel } from "../common/channels"

export class Play extends Phaser.State {
  create(game) {
    game.stage.backgroundColor = 0x551A8B

    const label = createSyncLabel(this, "Move me!", this.channel, "1")

    const label2 = createLabel(this, "Click to return to Lobby")
    label2.anchor.setTo(0.5)
    label2.inputEnabled = true
    label2.y += 100
    label2.events.onInputDown.add(() =>
      leaveChannel(this.channel, game.gotoLobby)
    )
  }

  init(...options) {
    console.log("starting Play state")
    const [channel] = options
    this.channel = channel
  }
}
