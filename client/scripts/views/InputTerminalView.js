var InputTerminalView = TerminalView.extend({

  initialize: function() {

    InputTerminalView.__super__.initialize.call(this);

    this.rect
      .attr("y", -4)
      .classed("terminal-input", true);

      var m = this.model;

      this.rect
      .on("mouseover", function() {
            enabled = true;
            cursorModel.set("activeTerminal", m);
        d3.select(this)
          .transition().duration(200)
          .attr("y", -8)
          .attr("height", 8);
      })
      .on("mouseout", function() {
            enabled = true;
            cursorModel.set("activeTerminal", null);
        d3.select(this)
          .transition().duration(200)
          .attr("y", -4)
          .attr("height", 4);
      });

//    this.updateAnchorPoints();
  }

});

