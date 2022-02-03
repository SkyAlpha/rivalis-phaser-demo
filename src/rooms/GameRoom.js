import { Room } from '@rivalis/core'
import ChatRouter from '../routers/ChatRouter'

class GameRoom extends Room {

    onCreate() {
        this.use('chat', ChatRouter)
    }

}

export default GameRoom