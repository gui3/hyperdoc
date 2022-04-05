import Item from './Item'

class ValueItem extends Item {
    constructor (value) {
        super('core.value', {})
        this.value = value
    }

    addChild (item, index = false) { 
        /*
        const that = new Item()
        that.addChild(new ValueItem(this.value))
        that.addChild(item, index)
        this.replaceBy(that)
        */
        throw new Error('cannot add child to a ValueItem')
    }
}

export default ValueItem