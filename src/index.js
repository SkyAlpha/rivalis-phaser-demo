import { createInstance } from '@rivalis/boot'
import ForestRoom from './rooms/ForestRoom'

createInstance(instance => {
    instance.rooms.define('forest', ForestRoom)
    instance.rooms.create('test', 'forest')
})