var BaseComponentModel = Backbone.Model.extend({

  defaults: {
    label: "component",
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
