/**
 * A Basic button component.
 *
 * @class
 * @type {*}
 */
var ButtonComponent = BaseComponent.extend({

    label: "button",

    inputSpecs: {
        input: {
            name: "input",
            description: "values and ticks will be copied to output."
        }
    },
    outputSpecs: {
        output: {name: "output"}
    },

    defaults: {
    }

});
