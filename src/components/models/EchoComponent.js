
var EchoComponent = BaseComponent.extend({

  label: "echo",

  inputs: {
    value: {
      name: "value",
      description: "Set the value of the component."
    }
  },
  outputs: {
    output: {name: "output"}
  }


});
