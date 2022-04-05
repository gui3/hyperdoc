class Item {
    constructor (type = null, properties = {}) {
        this.parent = null
        this.type = type
    }

    getIndex () {
        if (this.parent instanceof Item) {
            return this.parent.children.indexOf(this)
        }
        else {
            return null
        }
    }

    fromThisToRoot (action) {
        let parent = this
        while (parent instanceof Item) {
            action(parent)
            parent = parent.parent
        }
        if (parent !== null) {
            throw new Error('corrupted tree')
        }
    }

    detach() {
        if (this.parent instanceof Item) {
            this.parent.removeChild(this)
        }
        else if (this.parent === null) {
            // debug('Item is already detached')
        }
        else {
            throw new Error('child Item cannot be detached from invalid parent Item')
        }
    }

    moveTo(parent, index = false) {
        if (parent instanceof Item) {
            this.detach()
            parent.addChild(this, index)
        }
        else {
            throw new Error('invalid parent Item')
        }
    }
}

export default Item