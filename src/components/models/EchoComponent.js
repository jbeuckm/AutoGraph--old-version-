var EchoComponent = BaseComponent.extend({

    label: "echo",

    inputSpecs: {
        value: {
            name: "value",
            description: "Set the value of the component."
        }
    },
    outputSpecs: {
        output: {
            name: "output"
        }
    }


});
