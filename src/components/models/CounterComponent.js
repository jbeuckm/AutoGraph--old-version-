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
        count: 0
    },

    initialize: function () {
        BaseComponent.prototype.initialize.call(this);
    },

    receiveBang: function () {
        var self = this;

        var newCount = this.get("count") + 1;

        this.set("count", newCount);

        self.outputs.output.model.set("value", newCount);


        self.sendBang();

    }

});
