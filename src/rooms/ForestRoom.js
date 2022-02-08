import { Room } from '@rivalis/core'
import MapRouter from '../routers/MapRouter'

class ForestRoom extends Room {

    forest = null

    onCreate() {
        this.use('map', MapRouter)
    }

}

export default ForestRoom