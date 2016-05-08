// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
import {Game} from "./Game"
import {Socket} from "phoenix"

const token = document.head.querySelector("[name=token]").content
const socket = new Socket("/socket", { params: {token: token} })
const game = new Game(700, 450, "phaser")

// Lets go!
game.start(socket)
