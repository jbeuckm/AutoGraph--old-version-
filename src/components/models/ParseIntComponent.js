/**
 * Parse a received string into a JSON object
 *
 * @class
 * @type {*}
 */
var ParseIntComponent = BaseComponent.extend({

    label: "parse integer",

    inputSpecs: {
        input: {
            name: "input",
            description: "the string to be parsed"
        }
    },
    outputSpecs: {
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
