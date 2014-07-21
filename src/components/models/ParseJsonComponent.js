/**
 * Parse a received string into a JSON object
 *
 * @class
 * @type {*}
 */
var ParseJsonComponent = BaseComponent.extend({

    label: "parse json",

    inputs: {
        input: {
            name: "input",
            description: "the message to be parsed"
        },
    },
    outputs: {
        output: {
            name: "output",
            description: "parsed object"
        }
    },

    defaults: {

    },

    process: function(args, callback) {

        // remove trailing comma in json arrays or objects
        var fixedString = args.input.replace(/\s+/g,'').replace(/,(\s*)]$/, '$1]').replace(/,(\s*)\}$/, '$1\}');

        var obj = JSON.parse(fixedString);
        callback({output:obj});
    }

});
