
var ValueComponent = BaseComponent.extend({

  inputs: {
    value: {

      name: "value",
      description: "Set the value of the component."
    }
  },
  outputs: {
    output: {name: "output"}
  },

  defaults: {
    name: "value",
  }

});
