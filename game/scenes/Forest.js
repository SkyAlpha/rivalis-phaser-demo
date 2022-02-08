import { WebSocketClient } from '@rivalis/browser'
import { Scene } from 'phaser'
import ForestMap from '../objects/ForestMap'
import Player from '../objects/Player'
import PlayerInputObserver from '../PlayerInputObserver'


class Forest extends Scene {

    ws = new WebSocketClient()
    
    /** @type {Player} */
    mainPlayer = null

    playerInput = new PlayerInputObserver()

    /** @type {Map<string,Player>} */
    players = new Map()

    /** @type {ForestMap} */
    map = null

    create({ roomId, endpointUrl, token }) {
        this.map = new ForestMap(this)
    
        this.ws.setBaseURL(endpointUrl)
        this.ws.once('socket:connect', this.onConnect, this)
        this.ws.once('socket:disconnect', () => {
            window.location.reload()
        })
        this.ws.connect(token)
    }

    update() {
        this.players.forEach(player => player.update())
    }

    onConnect() {
        this.ws.once('map.sync', (topic, sender, { width, fields }) => this.drawForest(fields, width))
        this.ws.on('map.move', this.onMove, this)
        this.ws.on('map.leave', (topic, sender) => {
            let player = this.players.get(sender)
            this.map.remove(player)
            player.destroy()
            this.players.delete(sender)
        })
        this.ws.send('map.sync')
    }

    /**
     * 
     * @param {Array<boolean>} fields 
     * @param {number} width 
     */
    drawForest(fields, width) {
        this.map.draw(fields, width)
        this.add.existing(this.map)
        this.map.setPipeline('Light2D')
        this.lights.enable()
        this.lights.setAmbientColor(0x000000)
        this.physics.add.collider(this.map.list)
        this.physics.add.overlap(this.map.list, ()=> {}, null, this)
        const { width: mapWidth, height: mapHeight } = this.map.getBounds()
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight)
    }

    onMove(topic, sender, data) {
        const { x, y, direction: [ up, down, left, right ] } = data
        const player = this.players.get(sender) || null
        if (player === null) {
            const isMainPlayer = sender === this.ws.actorId
            this.createPlayer(sender, x, y, up, down, left, right, isMainPlayer)
            return
        }
        player.move(up, down, left, right, x, y)
    }

    createPlayer(id, x, y, up, down, left, right, controlled = false) {
        let player = new Player(this)

        this.players.set(id, player)
        this.map.add(player)
        player.move(up, down, left, right, x, y)
        if (controlled) {
            this.playerInput.enable(true, this)
            this.cameras.main.startFollow(player)
            this.playerInput.on('state', state => {
                const { up, down, left, right } = state
                const { x, y } = player
                this.ws.send('map.move', { x, y, direction: [ up, down, left, right ] })
                player.move(up, down, left, right)
            })
        }
    }

}

export default Forest