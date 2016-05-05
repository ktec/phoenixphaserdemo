import { createLabel } from "../common/labels"

export class Lobby extends Phaser.State {
  create() {
    const label = createLabel(this, "Hello world")
    label.anchor.setTo(0.5)
  }
}
