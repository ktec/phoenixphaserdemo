// serializePosition :: Sprite -> Object
export const serializePosition = ({x, y}) => Object.assign({x, y})

// syncPosition :: Sprite -> Channel -> Event -> Function -> Event -> Event
export const syncPosition = (sprite, channel, event) => {
  event.add(sprite => sendPosition(sprite, channel))
}

// sendPosition :: Sprite -> Channel -> Push
export const sendPosition = (sprite, channel) => {
  const message = serializePosition(sprite)
  console.log("Sending message", message)
  channel.push("shout", message)
}
