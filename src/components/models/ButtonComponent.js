
var ButtonComponent = BaseComponent.extend({

  defaults: {
    name: "button",
    inputs: {
      trigger: {
        name: "trigger",
        description: "Fire the button as if clicked."
      }
    },
    outputs: {
      output: {name: "output"}
    }
  }

});
