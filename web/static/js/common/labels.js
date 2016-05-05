const DEFAULT_STYLE = {font: "65px Arial", fill: "#ffffff" }

// createLabel :: Game -> String -> Object -> Sprite
export const createLabel = (state, message, style = DEFAULT_STYLE) => {
  const {centerX, centerY} = state.world
  return state.add.text(centerX, centerY, message, style)
}
