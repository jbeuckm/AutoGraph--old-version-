var TerminalModel = PositionedModel.extend({

  defaults: {
      id: "default_id",
      label: "terminal",
      component: null,
      connectedWires: [],

      anchorX: 0,
      anchorY: 0,
      controlPointX: 0,
      controlPointY: 0
  }

});
