var CursorModel = PositionedModel.extend({

  getAnchorCoords: function() {
    return {
      x: this.get("x"),
      y: this.get("y")
    };
  }

});
