import { createLabel } from "./labels"
import { syncPosition } from "./sync"

// createSyncLabel :: State -> String -> Channel -> String -> Sprite
export const createSyncLabel = (state, message, channel, id) => {
  const label = createLabel(state, message)
  label.anchor.setTo(0.5)
  label.inputEnabled = true
  label.input.enableDrag()

  label.id = id

  // send message on drag stop [sprite, channel, event]
  syncPosition(label, channel, label.events.onDragUpdate)

  return label
}
