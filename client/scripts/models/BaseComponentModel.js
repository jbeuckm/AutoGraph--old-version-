var BaseComponentModel = Backbone.Model.extend({

  defaults: {
    label: "component",
    x: 0,
    y: 0,
    inputs: [ {label: "input1"}, {label: "input2"} ],
    outputs: [ {label: "output1"} ]
  }

});
