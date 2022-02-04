import { Actor, Router, Schema } from '@rivalis/core'
import ForestGenerator from '../services/ForestGenerator'

const ForestSync = Schema.define({

})

class ForestMap extends Router {

    size = {
        x: 40,
        y: 40
    }

    onCreate() {
        let forest = ForestGenerator.Instance.generate(this.size.x, this.size.y)
        this.room.on('join', this.onJoin, this)

    }

    /**
     * 
     * @param {Actor} actor 
     */
    onJoin(actor) {
        
    }

}

export default ForestMap