/**
 * A Basic button component.
 *
 * @class
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
