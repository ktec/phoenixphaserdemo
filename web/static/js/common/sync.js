// serializePosition :: Sprite -> Object
export const serializePosition = ({x, y}) => Object.assign({x, y})

// syncPosition :: Sprite -> Channel -> Event -> Function -> Event -> Event
export const syncPosition = (sprite, channel, event) => {
  event.add(sprite => sendPosition(sprite, channel))
}

// sendPosition :: Sprite -> Channel -> String
export const sendPosition = (sprite, channel) => {
  console.log(serializePosition(sprite))
}
