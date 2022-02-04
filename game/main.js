
import { Game, Scale, WEBGL } from 'phaser'
import Forest from './scenes/Forest'
import Loader from './scenes/Loader'
import Lobby from './scenes/Lobby'

const game = new Game({
    type: WEBGL,
    antialiasGL: true,
    parent: 'root',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    dom: {
        createContainer: true,                
    },
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    width: 1280,
    height: 720
})

game.scene.add('loader', new Loader())
game.scene.add('lobby', new Lobby())
game.scene.add('forest', new Forest())

game.scene.start('forest')