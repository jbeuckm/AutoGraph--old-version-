var EchoComponent = BaseComponent.extend({

    label: "echo",

    inputs: {
        value: {
            name: "value",
            description: "Set the value of the component."
        }
    },
    outputs: {
        output: {
            name: "output"
        }
    },
/*
    /**
     * A tick was received at one of the inputs. Process the inputs and pass on the tick.
     *
     * @method
     *
    receiveTick: function () {
        var inputTerminalValues = this.readInputValues();
        var self = this;

        this.process(inputTerminalValues, function (results) {

            console.log("process results for " + self.label);
            console.log(results);

            self.updateOutputTerminals(results);
            self.sendTick();
        });
    }
*/

});
