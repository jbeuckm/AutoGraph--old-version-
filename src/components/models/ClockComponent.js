/**
 * Component to fire a tick at regular, settable interval.
 *
 * @class
 * @type {*}
 */
var ClockComponent = BaseComponent.extend({

    label: "clock",

    inputSpecs: {
        toggle: {
            name: "toggle",
            description: "Turn the clock off or on."
        },
        period: {
            name: "period",
            description: "Period of the clock in milliseconds."
        }
    },
    outputSpecs: {
        output: {name: "output"}
    },

    defaults: {
        period: 1000,
        running: true
    },

    initialize: function (args, opts) {
        BaseComponent.prototype.initialize.call(this, args, opts);

        var self = this;

        // reset clock when period changes
        this.inputs["period"].model.on("change:value", function (period) {
            clearTimeout(self.timeoutId);
            self.set("period", period.get("value"));
            self.tick();
        });

        this.tick();
    },

    /**
     * Toggle whether the clock is running.
     */
    receiveTick: function () {
        if (this.get("running")) {
            this.set("running", false);
        }
        else {
            this.set("running", true);
            this.tick();
        }
    },


    /**
     * Send the tick and prepare the next tick.
     */
    tick: function () {
        var self = this;
        this.timeoutId = setTimeout(function () {
            if (self.get("running")) {
                self.sendTick();
                self.tick();
            }
        }, this.get("period"));
    }

});
