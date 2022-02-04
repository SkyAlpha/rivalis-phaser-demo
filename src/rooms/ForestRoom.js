import { Room } from '@rivalis/core'
import ForestMap from '../routers/ForestMap'

class ForestRoom extends Room {

    forest = null

    onCreate() {
        this.use('forest', ForestMap)
    }

}

export default ForestRoom