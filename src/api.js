import Item from './Item'
import ItemStatic from './ItemStatic'
import ItemStackable from './ItemStackable'

function api (config = {}) {
    console.log("hello world")
}

api.Item = Item
api.ItemStatic = ItemStatic
api.ItemStackable = ItemStackable

export default api