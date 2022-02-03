import { createInstance } from '@rivalis/boot'
import GameRoom from './rooms/GameRoom'

createInstance(instance => {
    instance.rooms.define('game', GameRoom)
})