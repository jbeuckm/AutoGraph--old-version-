var BaseComponent = PositionedModel.extend({

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
    var outputs = this.get("outputs");
    for (var o in outputs) {
      console.log("BaseComponent sending to terminal "+o);
      outputs[o].model.sendMessage(messages[o]);
    }
  },

  receiveMessage: function(message) {
    console.log("BaseComponent receiveMessage "+JSON.stringify(message));

    var ins = this.readInputValues();
    var results = this.process(ins);
    this.sendOutputs(results);

  },


  buildInputs: function(inputs) {

    var cnt = 0;
    for (var i in inputs) {

      var input = inputs[i];
      console.log("build inputs for model:");
      console.log(this.cid);
      var im = new InputTerminalModel({
        componentId: this.cid,
        x: cnt * 20,
        y: 0,
        name: input.name
      });

      Terminals.add(im);

      input.model = im;

      cnt++;
    }
  },

  buildOutputs: function(outputs) {

    var cnt = 0;
    for (var i in outputs) {

      var output = outputs[i];

      var om = new OutputTerminalModel({
        componentId: this.cid,
        x: cnt * 20,
        y: 20,
        name: output.name
      });

      Terminals.add(om);

      output.model = om;

      cnt++;
    }
  }

});


var ComponentCollection = Backbone.Collection.extend({
  model: BaseComponent
});
