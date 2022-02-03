import { Actor, Router, Schema } from '@rivalis/core'

const ChatMessage = Schema.define({
    message: Schema.Type.STRING
})

class ChatRouter extends Router {

    onCreate() {
        this.register('message', this.onMessage, ChatMessage)
    }

    /**
     * 
     * @param {Actor} sender 
     * @param {string} key 
     * @param {string} data 
     */
    onMessage(sender, key, data) {
        this.room.broadcast(key, data, sender)
    }

}

export default ChatRouter