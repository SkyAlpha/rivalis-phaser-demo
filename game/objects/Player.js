import { GameObjects, Physics } from 'phaser'

class Player extends GameObjects.Sprite {

    /**
     * @type {GameObjects.Light}
     */
    spotLight = null

    direction = {
        x: 0,
        y: 0
    }

    speed = 180

    constructor(scene, controlled = true) {
        super(scene, 0, 0, 'grandma/side_walk', 1)
        this.anims.create({
            key: 'side',
            frames: this.anims.generateFrameNumbers('grandma/side_walk')
        })
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('grandma/up_walk')
        })
        this.setPipeline('Light2D')
        this.play('side')
        this.setOrigin(.5, 1)
        this.scene.physics.world.enable(this)
        this.body.setSize(100, 25)
        this.resetBodyOffset()
        this.spotLight = this.scene.lights.addLight(0, 0, controlled ? 3000: 50).setIntensity(controlled ? 2.5 : 1)
    }

    /**
     * 
     * @param {boolean} up 
     * @param {boolean} down 
     * @param {boolean} left 
     * @param {boolean} right 
     */
    move(up, down, left, right, x = null, y = null) {
        if (up) {
            this.direction.y = -1
        } else if (down) {
            this.direction.y = 1
        } else if (!up && !down) {
            this.direction.y = 0
        }

        if (left) {
            this.direction.x = -1
            this.flipX = true
        } else if (right) {
            this.direction.x = 1
            this.flipX = false
        } else if (!left && !right) {
            this.direction.x = 0
        }

        if (x !== null && y !== null) {
            this.setPosition(x, y)
        }
    }

    update() {
        if (this.direction.x !== 0 && this.direction.y !== 0) {
            this.body.setVelocityX(this.speed * this.direction.x * 0.7)
            this.body.setVelocityY(this.speed * this.direction.y * 0.7)
        } else {
            this.body.setVelocityX(this.speed * this.direction.x)
            this.body.setVelocityY(this.speed * this.direction.y)
        }
        
        this.spotLight.x = this.flipX ? this.x - 60 : this.x + 60
        this.spotLight.y = this.y - 50
    }

    destroy(fromScene) {
        this.scene.lights.removeLight(this.spotLight)
        super.destroy(fromScene)
    }

    /**
     * 
     */
    resetBodyOffset() {
        let { width, height } = this.getBounds()
        this.body.setOffset((width - 100) / 2, height - 25)
    }

}

export default Player