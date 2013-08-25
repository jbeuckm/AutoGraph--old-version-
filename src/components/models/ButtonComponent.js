
var ButtonComponent = BaseComponent.extend({

  label: "button",

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
  }

});
