var ButtonComponent = BaseComponent.extend({

  defaults: {
    label: "button",
    inputs: {
      trigger: {
        label: "trigger",
        description: "Fire the button as if clicked."
      }
    },
    outputs: {
      output: {label: "output"}
    }
  }

});
