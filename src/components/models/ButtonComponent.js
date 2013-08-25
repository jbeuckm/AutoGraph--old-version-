
var ButtonComponent = BaseComponent.extend({

  inputs: {
    trigger: {
      name: "trigger",
      description: "Fire the button as if clicked."
    }
  },
  outputs: {
    output: {name: "output"}
  },

  defaults: {
    name: "button"
  }

});
