/**
 * Access a property of an object
 *
 * @class
 * @type {*}
 */
var PropertyComponent = BaseComponent.extend({

    label: "value for key",

    inputSpecs: {
        input: {
            name: "object",
            description: "the object with a property"
        },
        key: {
            name: "key",
            description: "the property name"
        }
    },
    outputSpecs: {
        output: {
            name: "value",
            description: "property value"
        }
    },

    defaults: {

    },

    process: function(args, callback) {
        callback({
            output: args.input[args.key]
        });
    }

});
