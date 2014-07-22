/**
 * Increase an integer every tick.
 *
 * @class
 * @type {*}
 */
var CounterComponent = BaseComponent.extend({

    label: "counter",

    inputSpecs: {
        trigger: {
            name: "input"
        }
    },
    outputSpecs: {
        output: {name: "output"}
    },

    defaults: {
        count: 0
    },

    process: function(args, callback) {

        var newCount = this.get("count") + 1;

        this.set("count", newCount);

        callback({
            output: newCount
        });
    }

});
