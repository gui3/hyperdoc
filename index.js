(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.hyperdoc = factory());
})(this, (function () { 'use strict';

    class Item {
        constructor (type = null, properties = {}) {
            this.parent = null;
            this.type = type;
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
            let parent = this;
            while (parent instanceof Item) {
                action(parent);
                parent = parent.parent;
            }
            if (parent !== null) {
                throw new Error('corrupted tree')
            }
        }

        detach() {
            if (this.parent instanceof Item) {
                this.parent.removeChild(this);
            }
            else if (this.parent === null) ;
            else {
                throw new Error('child Item cannot be detached from invalid parent Item')
            }
        }

        moveTo(parent, index = false) {
            if (parent instanceof Item) {
                this.detach();
                parent.addChild(this, index);
            }
            else {
                throw new Error('invalid parent Item')
            }
        }
    }

    class ValueItem extends Item {
        constructor (value) {
            super('core.value', {});
            this.value = value;
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

    class StackItem extends Item {
        constructor (type = null, properties = {}) {
            super(type, properties);
            this.children = [];
            this.properties = {};
            for (key in properties) {
                this.setProperty(key, properties[key]);
            }
        }

        setProperty (key, value = true) {
            this.properties[key] = value;
        }

        removeChild(item) {
            const index = this.children.indexOf(item);
            if (index > -1) {
                this.children.splice(index, 1);
                item.parent = null;
            }
            else {
                throw new Error('child Item is not in parent Item')
            }
        }

        addChild(item, index = false) {
            if (item instanceof Item) {
                let circular = false;
                this.fromThisToRoot(i => circular = circular || i === item);
                if (!circular) {
                    item.detach();
                    if (index === false) {
                        this.children.push(item);
                    }
                    else {
                        this.children.splice(index, 0, item);
                    }
                    item.parent = this;
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

    function api (config = {}) {
        console.log("hello world");
    }

    api.Item = Item;
    api.ItemStatic = ValueItem;
    api.ItemStackable = StackItem;

    return api;

}));
