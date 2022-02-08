import { Events, Input, Scene } from 'phaser'

class PlayerInputObserver extends Events.EventEmitter {

    keys = {
        W: null,
        A: null,
        S: null,
        D: null,
        SPACE: null
    }

    state = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    /**
     * 
     * @param {boolean} value 
     * @param {Scene} scene
     */
    enable(value, scene) {
        if (value) {
            this.enableInput(scene)
        } else {
            this.disableInput(scene)
        }
    }

    /**
     * @private
     * @param {Scene} scene
     */
    enableInput(scene) {
        this.keys.W = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W).on('down', this.handleUpdate, this)
        this.keys.A = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A).on('down', this.handleUpdate, this)
        this.keys.S = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S).on('down', this.handleUpdate, this)
        this.keys.D = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D).on('down', this.handleUpdate, this)
        
        this.keys.W = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W).on('up', this.handleUpdate, this)
        this.keys.A = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A).on('up', this.handleUpdate, this)
        this.keys.S = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S).on('up', this.handleUpdate, this)
        this.keys.D = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D).on('up', this.handleUpdate, this)

        this.keys.SPACE = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE).on('down', this.handleUpdate, this)
    }

    /**
     * @private
     * @param {Scene} scene
     */
    disableInput(scene) {
        this.events.emit('move', { dirX: 0, dirY: 0, jump: 0 })
        scene.input.keyboard.removeAllListeners()
        scene.input.keyboard.removeAllKeys()
    }

    handleUpdate() {
        this.state.up = false
        this.state.down = false
        this.state.left = false
        this.state.right = false

        if (this.keys.W.isDown) {
            this.state.up = true
        } else if (this.keys.S.isDown) {
            this.state.down = true
        } else if (this.keys.W.isDown && this.keys.S.isDown) {
            this.state.up = false
            this.state.down = false
        }

        if (this.keys.A.isDown) {
            this.state.left = true
        } else if (this.keys.D.isDown) {
            this.state.right = true
        } else if (this.keys.A.isDown && this.keys.D.isDown) {
            this.state.left = false
            this.state.right = false
        }
        this.emit('state', this.state)
    }
}


export default PlayerInputObserver