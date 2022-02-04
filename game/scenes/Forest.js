import { WebSocketClient } from '@rivalis/browser'
import { Scene } from 'phaser'

const data = '[{"visited":true,"x":0,"y":0,"walls":{"top":true,"bottom":false,"left":true,"right":true}},{"visited":true,"x":1,"y":0,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":2,"y":0,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":3,"y":0,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":4,"y":0,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":5,"y":0,"walls":{"top":true,"bottom":false,"left":false,"right":false}},{"visited":true,"x":6,"y":0,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":7,"y":0,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":8,"y":0,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":9,"y":0,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":0,"y":1,"walls":{"top":false,"bottom":false,"left":true,"right":false}},{"visited":true,"x":1,"y":1,"walls":{"top":false,"bottom":true,"left":false,"right":false}},{"visited":true,"x":2,"y":1,"walls":{"top":true,"bottom":true,"left":false,"right":true}},{"visited":true,"x":3,"y":1,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":4,"y":1,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":5,"y":1,"walls":{"top":false,"bottom":true,"left":true,"right":true}},{"visited":true,"x":6,"y":1,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":7,"y":1,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":8,"y":1,"walls":{"top":true,"bottom":false,"left":true,"right":true}},{"visited":true,"x":9,"y":1,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":0,"y":2,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":1,"y":2,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":2,"y":2,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":3,"y":2,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":4,"y":2,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":5,"y":2,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":6,"y":2,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":7,"y":2,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":8,"y":2,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":9,"y":2,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":0,"y":3,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":1,"y":3,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":2,"y":3,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":3,"y":3,"walls":{"top":true,"bottom":true,"left":true,"right":false}},{"visited":true,"x":4,"y":3,"walls":{"top":true,"bottom":false,"left":false,"right":false}},{"visited":true,"x":5,"y":3,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":6,"y":3,"walls":{"top":true,"bottom":true,"left":true,"right":false}},{"visited":true,"x":7,"y":3,"walls":{"top":true,"bottom":false,"left":false,"right":false}},{"visited":true,"x":8,"y":3,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":9,"y":3,"walls":{"top":false,"bottom":false,"left":false,"right":true}},{"visited":true,"x":0,"y":4,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":1,"y":4,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":2,"y":4,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":3,"y":4,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":4,"y":4,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":5,"y":4,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":6,"y":4,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":7,"y":4,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":8,"y":4,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":9,"y":4,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":0,"y":5,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":1,"y":5,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":2,"y":5,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":3,"y":5,"walls":{"top":false,"bottom":false,"left":true,"right":false}},{"visited":true,"x":4,"y":5,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":5,"y":5,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":6,"y":5,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":7,"y":5,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":8,"y":5,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":9,"y":5,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":0,"y":6,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":1,"y":6,"walls":{"top":true,"bottom":true,"left":true,"right":false}},{"visited":true,"x":2,"y":6,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":3,"y":6,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":4,"y":6,"walls":{"top":true,"bottom":true,"left":false,"right":true}},{"visited":true,"x":5,"y":6,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":6,"y":6,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":7,"y":6,"walls":{"top":true,"bottom":true,"left":false,"right":true}},{"visited":true,"x":8,"y":6,"walls":{"top":true,"bottom":false,"left":true,"right":false}},{"visited":true,"x":9,"y":6,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":0,"y":7,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":1,"y":7,"walls":{"top":true,"bottom":true,"left":true,"right":false}},{"visited":true,"x":2,"y":7,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":3,"y":7,"walls":{"top":true,"bottom":false,"left":false,"right":false}},{"visited":true,"x":4,"y":7,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":5,"y":7,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":6,"y":7,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":7,"y":7,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":8,"y":7,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":9,"y":7,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":0,"y":8,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":1,"y":8,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":2,"y":8,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":3,"y":8,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":4,"y":8,"walls":{"top":false,"bottom":false,"left":true,"right":true}},{"visited":true,"x":5,"y":8,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":6,"y":8,"walls":{"top":true,"bottom":false,"left":false,"right":true}},{"visited":true,"x":7,"y":8,"walls":{"top":false,"bottom":false,"left":true,"right":false}},{"visited":true,"x":8,"y":8,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":9,"y":8,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":0,"y":9,"walls":{"top":true,"bottom":true,"left":true,"right":false}},{"visited":true,"x":1,"y":9,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":2,"y":9,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":3,"y":9,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":4,"y":9,"walls":{"top":false,"bottom":true,"left":false,"right":false}},{"visited":true,"x":5,"y":9,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":6,"y":9,"walls":{"top":false,"bottom":true,"left":false,"right":true}},{"visited":true,"x":7,"y":9,"walls":{"top":false,"bottom":true,"left":true,"right":false}},{"visited":true,"x":8,"y":9,"walls":{"top":true,"bottom":true,"left":false,"right":false}},{"visited":true,"x":9,"y":9,"walls":{"top":true,"bottom":true,"left":false,"right":true}}]'

class Forest extends Scene {

    ws = new WebSocketClient()

    create(/*{ roomId, endpointUrl, token }*/) {
        // this.ws.setBaseURL(endpointUrl)
        // this.ws.once('socket:connect', this.onConnect, this)
        // this.ws.once('socket:disconnect', () => {
        //     window.location.reload()
        // })
        // this.ws.connect(token)

        let map = JSON.parse(data)
        console.log(map)

        let element = this.add.dom(0, 0, 'div', {
            width: '100%',
            height: '100%'
        })
        element.setOrigin(0)

        

        for (let field of map) {
            const { x, y, walls: { top, left, bottom, right } } = field
            let box = document.createElement('div')
            box.style.width = '10%'
            box.style.height = '8%'
            box.style.background = '#ccc'
            box.style.display = 'block'
            box.style.float = 'left'
            box.style.boxSizing = 'border-box'
            if (top) {
                box.style.borderTop = 'solid 5px red'
            } else {
                box.style.borderTop = 'solid 5px #ccc'
            }
            if (bottom) {
                box.style.borderBottom = 'solid 5px red'
            } else {
                box.style.borderBottom = 'solid 5px #ccc'
            }
            if (left) {
                box.style.borderLeft = 'solid 5px red'
            } else {
                box.style.borderLeft = 'solid 5px #ccc'
            }
            if (right) {
                box.style.borderRight = 'solid 5px red'
            } else {
                box.style.borderRight = 'solid 5px #ccc'
            }
            element.node.appendChild(box)
        }
    }

    onConnect() {
        
    }

}

export default Forest