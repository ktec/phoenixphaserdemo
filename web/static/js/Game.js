import {Lobby} from "./states/Lobby"
import {Play} from "./states/Play"
import {joinChannel} from "./common/channels"

export class Game extends Phaser.Game {

  // Initialize Phaser
  constructor(width, height, container) {
    super(width, height, Phaser.AUTO, container, null)

    // set up game state [name, class, autostart]
    this.state.add("lobby", Lobby, false)
    this.state.add("play", Play, false)
  }

  start(socket) {
    // console.log("GAME STARTING")
    socket.connect()
    console.log(socket)

    // set up channels
    this.gotoLobby = () => {
      // console.log("create Lobby channel")
      const channel = socket.channel("games:lobby", {})

      // console.log("join Lobby channel")
      joinChannel(channel, () => {

        // console.log("successfully joined Lobby channel")
        this.state.start("lobby", true, false, channel)

      })
    }

    this.gotoPlay = () => {
      // console.log("create Play channel")
      const channel = socket.channel("games:play", {})

      // console.log("join Play channel")
      joinChannel(channel, (...options) => {

        // console.log("successfully joined Play channel")
        this.state.start("play", true, false, channel, ...options)

      })
    }

    this.gotoLobby()
  }
}
