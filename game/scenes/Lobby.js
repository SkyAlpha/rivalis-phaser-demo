import { Logger } from '@rivalis/utils'
import axios from 'axios'
import { GameObjects, Scene } from 'phaser'

class Lobby extends Scene {

    http = axios.create({ baseURL: 'http://localhost:2334' })

    appId = '87d19cb25f0c'

    logger = Logger.getLogger('scene=lobby')

    /** @type {GameObjects.Image} */
    bg = null

    /** @type {GameObjects.Text} */
    buttonText = null

    create() {
        this.drawScene()
    }

    createGame() {
        
    }

    createRoom() {
        this.buttonText.input.enabled = false
        this.buttonText.setAlpha(.5)
        return this.http.post(`/api/apps/${this.appId}/rooms`, { fleet: 'my PC', roomType: 'game' }).catch(() => {
            this.logger.error('create room fail', error)
        }).then((response) => {
            console.log(response.data.data)
        })
    }

    joinRoom(roomId) {
        return this.http.post(`/api/apps/${this.appId}/rooms/join`, { fleet: 'my PC', roomType: 'game' }).catch(() => {
            this.logger.error('create room fail', error)
        }).then((response) => {
            console.log(response.data.data)
        })
    }


    drawScene() {
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
}

export default Lobby