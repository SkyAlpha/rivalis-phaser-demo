import { Router, Schema } from '@rivalis/core'
import ForestGenerator from '../services/ForestGenerator'

const GameMap = Schema.define({
    width: Schema.Type.UNSIGNED_INT32,
    fields: Schema.Type.ARRAY_BOOL
})

const PlayerMove = Schema.define({
    x: Schema.Type.DOUBLE,
    y: Schema.Type.DOUBLE,
    direction: Schema.Type.ARRAY_BOOL
})

class ForestState {

    size = {
        x: 10,
        y: 10
    }

    forest = {
        fields: [],
        width: 0
    }

    players = new Map()

    generate() {
        let { fields, width } = ForestGenerator.Instance.generate(this.size.x, this.size.y)
        this.forest.fields = fields
        this.forest.width = width
    }

} 

class MapRouter extends Router {


    state = new ForestState()

    onCreate() {
        this.state.generate()
        this.room.on('join', this.onJoin, this)
        this.room.on('leave', this.onLeave, this)
        this.listen('sync', this.onSyncRequest, Schema.Empty, GameMap)   
        this.listen('move', this.onMove, PlayerMove)
        this.listen('leave', this.onLeave, Schema.Empty, Schema.Empty)
    }

    onJoin(actor) {
        this.state.players.set(actor.id, {
            x: 250,
            y: 250,
            direction: [ false, false, false, false ]
        })
    }

    onLeave(actor) {
        this.state.players.delete(actor.id)
        let topic = this.getTopic('leave')
        this.room.broadcast(topic, {}, actor)
    }

    onSyncRequest(sender, topic) {
        this.room.send(sender, topic, this.state.forest)
        let moveTopic = this.getTopic('move')
        this.state.players.forEach((player, id) => {
            let actor = this.room.actors.get(id)
            if (actor === null) {
                return
            }
            this.room.send(sender, moveTopic, player, actor)
        })
        this.room.broadcast(moveTopic, this.state.players.get(sender.id), sender)
    }

    onMove(sender, topic, data) {
        this.state.players.set(sender, data)
        this.room.broadcast(topic, data, sender, async (sender, receiver) => sender.id !== receiver.id)
    }

}

export default MapRouter