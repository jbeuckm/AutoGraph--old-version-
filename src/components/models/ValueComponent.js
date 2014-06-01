var ValueComponent = BaseComponent.extend({

    label: "value",

    inputs: {
        input: {
            name: "input",
            description: "Set the value of the component."
        }
    },
    outputs: {
        output: {name: "output"}
    },

    defaults: {
        value: ""
    },

    /**
     * A tick was received at one of the inputs. Process the inputs and pass on the tick.
     *
     * @method
     */
    receiveTick: function () {
        var inputTerminalValues = this.readInputValues();
        var self = this;

        this.process(inputTerminalValues, function (results) {

            console.log("process results for " + self.label);
            console.log(results);

            self.updateOutputTerminals({
                output: self.get("value")
            });
            self.sendTick();
        });
    }

});
