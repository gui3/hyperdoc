import Item from './Item'

class StackItem extends Item {
    constructor (type = null, properties = {}) {
        super(type, properties)
        this.children = []
        this.properties = {}
        for (key in properties) {
            this.setProperty(key, properties[key])
        }
    }

    setProperty (key, value = true) {
        this.properties[key] = value
    }

    removeChild(item) {
        const index = this.children.indexOf(item)
        if (index > -1) {
            this.children.splice(index, 1)
            item.parent = null
        }
        else {
            throw new Error('child Item is not in parent Item')
        }
    }

    addChild(item, index = false) {
        if (item instanceof Item) {
            let circular = false
            this.fromThisToRoot(i => circular = circular || i === item)
            if (!circular) {
                item.detach()
                if (index === false) {
                    this.children.push(item)
                }
                else {
                    this.children.splice(index, 0, item)
                }
                item.parent = this
            }
            else {
                throw new Error('cannot add Item : circular reference')
            }
        }
        else {
            throw new Error('trying to add invalid Item')
        }
    }
}

export default StackItem