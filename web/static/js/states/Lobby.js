import { createLabel } from "../common/labels"

export class Lobby extends Phaser.State {
  init(...options) {
    const [channel] = options
    this.channel = channel
  }

  create() {
    const label = createLabel(this, "Hello world")
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.input.enableDrag()
  }
}
