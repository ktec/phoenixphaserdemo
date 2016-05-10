// cursorControlled :: Sprite -> Cursors -> Number -> Sprite
export const cursorControlled = (sprite, cursors, xspeed = 1, yspeed = 10, xdamping = 0.999, ydamping = 0.999) => {
  const {velocity} = sprite.body
  const {up, down, left, right} = cursors
  sprite.update = () => {
    if (left.isDown) {
      velocity.x -= xspeed
    } else if (right.isDown) {
      velocity.x += xspeed
    } else {
      velocity.x *= xdamping
    }

    if (up.isDown && sprite.body.touching.down) {
      velocity.y -= yspeed * 10
    } else if (down.isDown) {
      velocity.y += yspeed
    } else {
      velocity.y *= ydamping
    }
  }
}

// cursorControlledWithEasing :: Sprite -> Cursors -> Number -> Sprite
export const cursorControlledWithEasing = (sprite, cursors, speed = 1) => {
  const {velocity} = sprite.body
  const {up, down, left, right} = cursors
  sprite.update = () => {
    if (left.isDown) {
      velocity.x -= speed
    } else if (right.isDown) {
      velocity.x += speed
    } else {
      velocity.x *= 0.9
    }

    if (up.isDown) {
      velocity.y -= speed
    } else if (down.isDown) {
      velocity.y += speed
    } else {
      // velocity.y = 0
    }
  }
}
