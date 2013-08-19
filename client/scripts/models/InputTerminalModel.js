var InputTerminalModel = PositionedModel.extend({

  defaults: {
    label: "terminal",
    component: null,
    connections: []
  },

  getAnchorCoords: function() {
    return {
      x: this.get("component").get("x") + this.get("x") + 7.5,
      y: this.get("component").get("y") + this.get("y") + -2
    }
  }

});
