/**
 * A Basic button component.
 *
 * @type {*}
 */
var ButtonComponent = BaseComponent.extend({

  label: "button",

  inputs: {
    input: {
      name: "input",
      description: "values and bangs will be copied to output."
    }
  },
  outputs: {
    output: {name: "output"}
  },

  defaults: {
  }

});
