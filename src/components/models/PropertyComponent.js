/**
 * Access a property of an object
 *
 * @class
 * @type {*}
 */
var PropertyComponent = BaseComponent.extend({

    label: "property",

    inputs: {
        input: {
            name: "object",
            description: "the object with a property"
        },
        key: {
            name: "key",
            description: "the property name"
        }
    },
    outputs: {
        value: {
            name: "value",
            description: "property value"
        }
    },

    defaults: {

    },

    initialize: function () {
        BaseComponent.prototype.initialize.call(this);
    },

    process: function(args, callback) {
        callback({
            output: args.object[this.get("key")]
        });
    }

});
