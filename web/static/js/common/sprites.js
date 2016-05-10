export const createSprite = (game, {id, position, shape}) => {
  const sprite = game.add.sprite(position.x, position.y, shape)
  sprite.id = id
  sprite.anchor.setTo(0.5)
  return sprite
}
