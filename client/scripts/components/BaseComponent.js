var BaseComponent = Backbone.Model.extend({

  defaults: {
    x: 0,
    y: 0,
    inputs: [],
    inputWires: [],
    outputs: [],
    outputWires: []
  },

  run: function(args) {

    var outs = this.outputWires;

    for (var i=0, l=outs.length; i<l; i++) {
      outs[i].send();
    }

  }

});
