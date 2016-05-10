const BROADCAST_FREQUENCY = 16 // 60fps approx

// serializePosition :: Sprite -> Object
export const serializePosition = ({id, x, y}) => Object.assign({id, x, y})

// syncPosition :: Sprite -> Channel -> Event -> Function -> Event
export const syncPosition = (sprite, channel, event) => {
  event.add(sprite => sendPosition(sprite, channel))
  receivePosition(sprite, channel)
}

// sendPosition :: Sprite -> Channel -> Push
export const sendPosition = (sprite, channel) => {
  channel.push("position", serializePosition(sprite))
}

// receivePosition = Sprite -> Channel -> Push
export const receivePosition = (sprite, channel) => {
  const callback = ({id, x, y}) => {
    if (id === sprite.id) { sprite.position.setTo(x, y) }
  }
  channel.on("position", callback)
  // remove the callback when the sprite is destroyed
  removeCallbackOnDestroy(sprite, channel, callback)
}

const removeCallbackOnDestroy = (sprite, channel, callback) => {
  sprite.events.onDestroy.add(() => {
    channel.bindings = channel.bindings.filter(b => {
      return b.callback !== callback
    })
  })
}

// sharePosition :: Timer -> Sprite -> TimerEvent
export const sharePosition = (sprite, channel, framerate = BROADCAST_FREQUENCY) => {
  const timer = sprite.game.time.events
  timer.loop(framerate, () => { sendPosition(sprite, channel) })
}
