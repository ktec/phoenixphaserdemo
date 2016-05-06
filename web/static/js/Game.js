import {Lobby} from "./states/Lobby"

export class Game extends Phaser.Game {

  // Initialize Phaser
  constructor(width, height, container) {
    super(width, height, Phaser.AUTO, container, null)

    // set up game state [name, class, autostart]
    this.state.add("lobby", Lobby, false)
  }

  start(socket) {
    socket.connect()
  }

}
