class ForestField {

    visited = false

    x = 0

    y = 0

    walls = {
        top: true,
        bottom: true,
        left: true,
        right: true
    }

    constructor(x, y) {
        this.x = x
        this.y = y
    }

}

class ForestGenerator {

    /**
     * @private
     * @type {Array<ForestField>}
     */
    fields = []

    /**
     * @private
     * @type {Map<string,ForestField>}
     */
    fieldMap = new Map()

    /**
     * 
     * @param {number} sizeX 
     * @param {number} sizeY 
     * @returns 
     */
    generate(sizeX, sizeY) {
        this.prepareFields(sizeX, sizeY)
        let startingField = this.getRandomField()
        let stack = [ startingField ]
        let visitedFields = 0
        
        while(visitedFields < this.fields.length) {
            let currentField = stack.at(stack.length - 1) || null
            if (currentField.visited === false) {
                currentField.visited = true
                visitedFields++
            }

            let neighborFields = this.getNeighborFields(currentField).filter(field => field.visited === false)
            
            let nextField = neighborFields[Math.floor(Math.random() * neighborFields.length)] || null
            if (nextField === null) {
                stack.pop()
                continue
            }
            this.markPath(currentField, nextField)
            stack.push(nextField)
        }
        let fields = this.toBoolArray(sizeX, sizeY)
        let width = sizeX * 2 + 1
        return { fields, width }
    }

    /**
     * @private
     * @param {number} sizeX 
     * @param {number} sizeY 
     */
    toBoolArray(sizeX, sizeY) {
        
        let boolArray = []

        for (let y = -.5; y <= sizeY; y+= .5) {
            let fieldY = Math.floor(y)
            
            for (let x = -.5; x < sizeX; x += .5) {
                let fieldX = Math.floor(x)
                let field = this.getField(fieldX, fieldY)

                if (field === null) {
                    boolArray.push(false)
                    continue
                }

                if (fieldX === x && fieldY === y && field !== null) {
                    boolArray.push(true)
                    continue
                }
                if (fieldX !== x && fieldY === y && field !== null) {
                    boolArray.push(!field.walls.right)
                    continue
                }

                if (fieldX === x && fieldY !== y && field !== null) {
                    boolArray.push(!field.walls.bottom)
                    continue
                }
                boolArray.push(false)
            }   
        }
        return boolArray
    }

    /**
     * @private
     */
    getField(x, y) {
        return this.fieldMap.get(`${x}:${y}`) || null
    }

    /**
     * @private
     */
    getRandomField() {
        let seed = Math.random() * this.fields.length * 10
        let index = Math.floor(Math.floor(seed) / 10)
        return this.fields[index]
    }

    /**
     * @private
     * @param {ForestField} field 
     * @returns {Array<ForestField>}
     */
    getNeighborFields(field) {
        let neighborFields = []
        
        let upperField = this.getField(field.x, field.y - 1)
        let lowerField = this.getField(field.x, field.y + 1)
        let leftField = this.getField(field.x - 1, field.y)
        let rightField = this.getField(field.x + 1, field.y)
            
        if (upperField !== null) {
            neighborFields.push(upperField)
        }

        if (lowerField !== null) {
            neighborFields.push(lowerField)
        }

        if (leftField !== null) {
            neighborFields.push(leftField)
        }

        if (rightField !== null) {
            neighborFields.push(rightField)
        }

        return neighborFields
    }

    /**
     * @private
     * @param {ForestField} field1 
     * @param {ForestField} field2 
     */
    markPath(field1, field2) {
        let x = field2.x - field1.x 
        let y = field2.y - field1.y
        
        if (x === 1) {
            field1.walls.right = false
            field2.walls.left = false
        } else if (x === -1) {
            field1.walls.left = false
            field2.walls.right = false
        } else if (y === 1) {
            field1.walls.bottom = false
            field2.walls.top = false
        } else if (y === -1) {
            field1.walls.top = false
            field2.walls.bottom = false
        }
    }

    /**
     * @private
     */
    prepareFields(sizeX, sizeY) {
        this.fields = []
        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                let field = new ForestField(x, y)
                this.fields.push(field)
                this.fieldMap.set(`${x}:${y}`, field)
            }
        }
    }

}


ForestGenerator.Instance = new ForestGenerator()
export default ForestGenerator