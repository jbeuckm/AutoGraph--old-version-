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
        console.log("Value: receiveTick()");
        var inputTerminalValues = this.readInputValues();

        console.log("Value::inputs = ");
        console.log(inputTerminalValues);

        var self = this;

        this.process(inputTerminalValues, function (results) {

            var outs = {
                output: self.get("value")
            };

            console.log("Value::outputs = ");
            console.log(outs);

            self.updateOutputTerminals(outs);
            self.sendTick();
        });
    }

});
