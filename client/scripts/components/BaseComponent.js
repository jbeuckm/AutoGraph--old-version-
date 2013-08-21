var BaseComponent = PositionedModel.extend({

  defaults: {
    label: "component",
    inputs: {
      input1: {label: "input1"},
      input2: {label: "input2"}
    },
    outputs: {
      output1: {label: "output1"},
      output2: {label: "output2"}
    }
  },

  collectInputs: function() {
    return [true];
  },

  process: function(args) {
    return [true];
  },

  sendOutputs: function(results) {
    for (var o in outputs) {

    }
  }

});
