/**
 * Parse a received string into a JSON object
 *
 * @class
 * @type {*}
 */
var ParseJsonComponent = BaseComponent.extend({

    label: "parse",

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

    initialize: function () {
        BaseComponent.prototype.initialize.call(this);
    },

    process: function(args, callback) {

        console.log(args.input);
        var fixedString = args.input.replace(/\s+/g,'').replace(/,(\s*)]$/, '$1]').replace(/,(\s*)\}$/, '$1\}');
        console.log(fixedString);

        var obj = JSON.parse(fixedString);
        console.log(obj);
        callback(obj);
    }

});
