
var ValueComponent = BaseComponent.extend({

  defaults: {
    name: "value",
    inputs: {
      value: {
        name: "value",
        description: "Set the value of the component."
      }
    },
    outputs: {
      output: {name: "output"}
    }
  }

});
