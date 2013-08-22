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

  initialize: function() {
    PositionedModel.prototype.initialize();
    console.log("BaseComponent init");
    this.buildInputs(this.get("inputs"));
    this.buildOutputs(this.get("outputs"));
  },

  readInputValues: function() {
    return [true];
  },

  process: function(args) {
    console.log("BaseComponent processing "+JSON.stringify(args));
    return [true];
  },

  sendOutputs: function(messages) {
    console.log("BaseComponent sending "+JSON.stringify(messages));
    var outputs = this.get("outputs");
    for (var o in outputs) {
      outputs[o].model.sendMessage(messages[o]);
    }
  },

  receiveMessage: function(input) {
    console.log("BaseComponent trigger "+JSON.stringify(input));
    var ins = this.readInputValues();
    var results = this.process(ins);
    this.sendOutputs(results);
  },


  buildInputs: function(inputs) {

    var cnt = 0;
    for (var i in inputs) {

      var input = inputs[i];

      var im = new InputTerminalModel({
        id: i,
        component: this,
        x: cnt * 20,
        y: 0,
        label: input.label
      });

      input.model = im;

      cnt++;
    }
  },

  buildOutputs: function(outputs) {

    var cnt = 0;
    for (var i in outputs) {

      var output = outputs[i];

      var om = new OutputTerminalModel({
        id: i,
        component: this,
        x: cnt * 20,
        y: 20,
        label: output.label
      });

      output.model = om;

      cnt++;
    }
  }

});
