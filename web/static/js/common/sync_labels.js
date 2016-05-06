import { createLabel } from "./labels"
import { syncPosition } from "./sync"

export const createSyncLabel = (state, message, channel) => {
  const label = createLabel(state, message)
  label.anchor.setTo(0.5)
  label.inputEnabled = true
  label.input.enableDrag()

  // send message on drag stop [sprite, channel, event]
  syncPosition(label, channel, label.events.onDragStop)

  return label
}
