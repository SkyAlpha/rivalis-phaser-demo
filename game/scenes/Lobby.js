import { Logger } from '@rivalis/utils'
import { AppClient } from '@rivalis/browser'
import { GameObjects, Scene } from 'phaser'

class Lobby extends Scene {

    app = new AppClient('http://localhost:2334', '80013b831326')

    logger = Logger.getLogger('scene=lobby')

    /** @type {GameObjects.Image} */
    bg = null

    /** @type {GameObjects.Text} */
    buttonText = null

    create() {
        let url = new URL(window.location.href)
        let roomId = url.searchParams.get('roomId') || null
        
        if (roomId !== null) {
            this.joinRoom(roomId)
            return
        }

        this.bg = this.add.image(0, 0, 'background').setOrigin(0).setPipeline('Light2D')
        this.lights.enable()
        this.lights.setAmbientColor(0x808080)
        this.spotLight = this.lights.addLight(140, 370, 1000).setIntensity(2)

        this.buttonText = this.add.text(640, 670, 'CREATE GAME', {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#00a6ed'
        }).setStroke('#2d2d2d', 4).setOrigin(.5)
        this.buttonText
            .on('pointerover', () => this.buttonText.setStyle({ color: '#ffffff' }))
            .on('pointerout', () => this.buttonText.setStyle({ color: '#00a6ed' }))
            .on('pointerdown', () => {
                this.createRoom()
            })
            .setAlpha(0)
        this.add.tween({ targets: [ this.buttonBg, this.buttonText ], alpha: 1, duration: 500 }).on('complete', () => {
            this.buttonText.setInteractive({ cursor: 'pointer' })
        })
    }

    async createRoom() {
        let access = await this.app.createRoom('my PC', 'forest')

        // change url and move to the next scene
        let url = new URL(window.location.href)
        url.searchParams.append('roomId', access.roomId)
        window.history.replaceState({}, null, url.toString())
        this.scene.start('forest', access)
    }

    async joinRoom(roomId) {
        let access = await this.app.joinRoom('my PC', roomId)
        this.scene.start('forest', access)
    }


    
}

export default Lobby