var OutputTerminalView = TerminalView.extend({

  initialize: function() {

    OutputTerminalView.__super__.initialize.call(this);

    this.rect
      .classed("terminal-output", true);

    this.updateAnchorPoints();
  },


  updateAnchorPoints: function() {
    OutputTerminalView.__super__.updateAnchorPoints.call(this);

    var m = this.model;
    m.set("controlPointX", m.get("anchorX"));
    m.set("controlPointY", m.get("anchorY") + 50);
  }

});

