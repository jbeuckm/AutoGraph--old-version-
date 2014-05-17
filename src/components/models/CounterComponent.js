/**
 * Transmit a received signal after a given timelapse.
 *
 * @class
 * @type {*}
 */
var DelayComponent = BaseComponent.extend({

    label: "counter",

    inputs: {
        trigger: {
            name: "input"
        },
    },
    outputs: {
        output: {name: "output"}
    },

    defaults: {

    },

    initialize: function () {
        BaseComponent.prototype.initialize.call(this);
    },

    receiveBang: function () {
        var self = this;

        self.sendBang();

    }

});
