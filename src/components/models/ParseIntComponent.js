/**
 * Parse a received string into a JSON object
 *
 * @class
 * @type {*}
 */
var ParseIntComponent = BaseComponent.extend({

    label: "parse integer",

    inputs: {
        input: {
            name: "input",
            description: "the string to be parsed"
        }
    },
    outputs: {
        output: {
            name: "output",
            description: "parsed integer"
        }
    },

    defaults: {

    },

    process: function(args, callback) {
        callback({
            output: parseInt(args.input)
        });
    }

});
