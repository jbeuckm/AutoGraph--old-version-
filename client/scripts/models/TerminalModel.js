var TerminalModel = PositionedModel.extend({

  defaults: {
      name: "terminal",
      componentId: null,

      anchorX: 0,
      anchorY: 0,
      controlPointX: 0,
      controlPointY: 0
  }

});

var TerminalCollection = Backbone.Collection.extend({
  model: TerminalModel
});
