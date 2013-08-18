var BaseComponentModel = Backbone.Model.extend({

  defaults: {
    label: "component",
    x: 0,
    y: 0,
    inputs: [],
    outputs: [ {label: "output"} ]
  }

});
