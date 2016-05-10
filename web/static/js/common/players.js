import { cursorControlled } from "./cursors"

export const createPlayer = ({physics, input}, sprite) => {
  physics.arcade.enable(sprite)
  sprite.body.gravity.y = 600
	sprite.body.bounce.y = 0.36
	sprite.body.collideWorldBounds = true
  const cursors = input.keyboard.createCursorKeys()
  cursorControlled(sprite, cursors, 6, 30, 0.55, 0.999)
  return sprite
}
