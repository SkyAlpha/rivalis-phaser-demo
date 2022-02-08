import { GameObjects, Scene, Tweens } from 'phaser'
import { Logger } from '@rivalis/utils'

class Loader extends Scene {

    logger = Logger.getLogger('scene=loader')

    /** @type {GameObjects.Image} */
    bg = null

    /** @type {GameObjects.Text} */
    loadingText = null

    /** @type {GameObjects.Light} */
    spotLight = null

    /** @type {Tweens.Tween} */
    spotLightTween = null

    init() {
        this.logger.info('init')
    }

    preload() {
        this.load.image('background', '/assets/background.png')
    }

    create() {
        this.bg = this.add.image(0, 0, 'background').setOrigin(0).setPipeline('Light2D')

        this.loadingText = this.add.text(640, 670, 'Loading', {
            fontFamily: 'Arial Black',
            fontSize: 32,
            color: '#00a6ed'
        }).setOrigin(.5)
            .setStroke('#2d2d2d', 4)
            .setShadow(4, 4, '#000000', 8, true, false)

        this.lights.enable()
        this.lights.setAmbientColor(0x808080)
        this.spotLight = this.lights.addLight(140, 370, 280).setIntensity(3)
        this.spotLightTween = this.add.tween({
            targets: this.spotLight,
            x: { value: 1100, duration: 4000, ease: 'Power2', delay: 500 },
            y: { value: 500, duration: 1500, ease: 'Bounce.easeOut' },
            yoyo: true,
            loop: -1
        })

        this.load.image('tileset/forest_field_0', '/assets/tileset/forest_field_0.png')
        this.load.image('tileset/forest_field_1', '/assets/tileset/forest_field_1.png')
        this.load.image('tileset/forest_field_2', '/assets/tileset/forest_field_2.png')
        this.load.image('tileset/forest_field_3', '/assets/tileset/forest_field_3.png')
        this.load.image('tileset/forest_field_4', '/assets/tileset/forest_field_4.png')
        this.load.image('tileset/forest_field_5', '/assets/tileset/forest_field_5.png')
        this.load.image('tileset/forest_field_6', '/assets/tileset/forest_field_6.png')
        this.load.image('tileset/forest_field_7', '/assets/tileset/forest_field_7.png')
        this.load.image('tileset/forest_field_8', '/assets/tileset/forest_field_8.png')
        this.load.image('tileset/forest_field_9', '/assets/tileset/forest_field_9.png')

        this.load.image('tileset/ground_field_0', '/assets/tileset/ground_field_0.png')
        this.load.image('tileset/ground_field_1', '/assets/tileset/ground_field_1.png')
        this.load.image('tileset/ground_field_2', '/assets/tileset/ground_field_2.png')
        this.load.image('tileset/ground_field_3', '/assets/tileset/ground_field_3.png')
        this.load.image('tileset/ground_field_4', '/assets/tileset/ground_field_4.png')

        this.load.spritesheet('grandma/side_walk', '/assets/anims/grandma_side_walk.png', { frameWidth: 204, frameHeight: 150, endFrame: 8 })
        this.load.spritesheet('grandma/up_walk', '/assets/anims/grandma_up_walk.png', { frameWidth: 145, frameHeight: 146 })

        this.load.on('complete', () => this.goToLobby())
        this.load.start()
    }

    goToLobby() {

        this.spotLightTween.remove()
        this.add.tween({
            targets: this.loadingText,
            alpha: { value: 0, duration: 1500 }
        })
        this.add.tween({
            targets: this.spotLight,
            radius: 1000,
            x: 140,
            y: 370,
            intensity: 2,
            duration: 1500
        }).on('complete', () => {
            this.bg.destroy()
            this.loadingText.destroy()
            this.scene.stop()
            this.game.scene.start('lobby')
        })

    }

}

export default Loader