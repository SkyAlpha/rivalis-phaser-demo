import { GameObjects, Physics, Scene, Time } from 'phaser'
import Player from './Player'

class ForestMap extends GameObjects.Container {

    /**
     * @type {Time.TimerEvent}
     */
    updateTimer = null

    /** @type {Physics.Arcade.StaticGroup} */
    group = null

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene) {
        super(scene, 0, 0)
        this.updateTimer = scene.time.addEvent({
            callback: this.update,
            callbackScope: this,
            loop: true,
            delay: 30
        })
    }

    /**
     * 
     * @param {Array<boolean>} fields 
     * @param {number} fieldWidth 
     */
    draw(fields, fieldWidth) {
        for (let [index, isGround] of fields.entries()) {
            let x = Math.floor(index % fieldWidth)
            let y = Math.floor(index / fieldWidth)
            let fieldTexture = null
            if (isGround) {
                fieldTexture = `tileset/ground_field_${index % 5}`
            } else {
                fieldTexture = `tileset/forest_field_${index % 10}`
            }
            let field = this.scene.add.sprite((x * 148) + 74, y * 148 + 148, fieldTexture).setOrigin(.5, 1).setPipeline('Light2D')
            if (!isGround) {
                this.scene.physics.world.enable(field, Physics.Arcade.STATIC_BODY)
                field.body.setSize(148, 148)
                field.body.setOffset(0, 75)
            }
            this.add(field)
        }
        this.update()
    }

    update() {

        this.list.sort((objectA, objectB) => {
            let depthA = objectA.y
            let depthB = objectB.y
            if (objectA instanceof Player) {
                depthA += 148
            }
            if (objectB instanceof Player) {
                depthB += 148
            }
            return depthA - depthB
        })

    }

}

export default ForestMap