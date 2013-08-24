define(['models/PositionedModel', 'models/OutputTerminalModel', 'models/InputTerminalModel'],
  function (PositionedModel, OutputTerminalModel, InputTerminalModel) {

  return PositionedModel.extend({

  defaults: {
    name: "component",
    inputs: {
      input1: {name: "input1"},
      input2: {name: "input2"}
    },
    outputs: {
      output1: {name: "output1"},
      output2: {name: "output2"}
    }
  },

  initialize: function() {
    this.buildInputs(this.get("inputs"));
    this.buildOutputs(this.get("outputs"));
  },

  receiveMessage: function(message) {
    var ins = this.readInputValues(message);
    var results = this.process(ins);
    this.sendOutputs(results);
  },

  readInputValues: function() {
    return [true];
  },

  process: function(args) {
    return [true];
  },

  sendOutputs: function(message) {
    this.trigger("message", message);
  },


  buildInputs: function(inputs) {

    var cnt = 0;
    for (var i in inputs) {

      var input = inputs[i];

      var im = new InputTerminalModel({
        autograph: this.get("autograph"),
        component: this,
        x: cnt * 20,
        y: 0,
        name: input.name
      });

      this.listenTo(im, "message", this.receiveMessage);

      input.model = im;

      this.get("autograph").Terminals.add(im);

      cnt++;
    }
  },

  buildOutputs: function(outputs) {

    var cnt = 0;
    for (var i in outputs) {

      var output = outputs[i];

      var om = new OutputTerminalModel({
        autograph: this.get("autograph"),
        component: this,
        x: cnt * 20,
        y: 20,
        name: output.name
      });

      output.model = om;

      this.get("autograph").Terminals.add(om);

      cnt++;
    }
  }

});

});


