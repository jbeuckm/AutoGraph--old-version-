/**
 * Transmit a received signal after a given timelapse.
 *
 * @class
 * @type {*}
 */
var DelayComponent = BaseComponent.extend({

    label: "delay",

    inputs: {
        trigger: {
            name: "input"
        },
        period: {
            name: "period",
            description: "Period of the delay in milliseconds."
        }
    },
    outputs: {
        output: {name: "output"}
    },

    defaults: {
        period: 500
    },

    initialize: function () {
        BaseComponent.prototype.initialize.call(this);
    },

    process: function(args, callback) {

        setTimeout(function () {

            callback(args);

        }, this.get("period"));
    }

});
