import { createSyncLabel } from "../common/sync_labels"

export class Lobby extends Phaser.State {
  init(...options) {
    const [channel] = options
    this.channel = channel
  }

  create() {
    const label = createSyncLabel(this, "Hello world", this.channel)
  }
}
