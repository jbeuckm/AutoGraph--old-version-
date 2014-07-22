/**
 * Transmit a received signal after a given timelapse.
 *
 * @class
 * @type {*}
 */
var DelayComponent = BaseComponent.extend({

    label: "delay",

    inputSpecs: {
        input: {
            name: "input",
            description: "the message to be passed after the delay"
        },
        period: {
            name: "period",
            description: "Period of the delay in milliseconds."
        }
    },
    outputSpecs: {
        output: {name: "output"}
    },

    defaults: {
        period: 500
    },

    process: function(args, callback) {

        setTimeout(function () {

            callback(args);

        }, this.get("period"));
    }

});
