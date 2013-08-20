var OutputTerminalView = TerminalView.extend({

  initialize: function() {

    OutputTerminalView.__super__.initialize.call(this);

    this.rect
      .classed("terminal-output", true);

    this.updateAnchorPoints();
  }

});

