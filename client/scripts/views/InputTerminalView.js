var InputTerminalView = TerminalView.extend({

  initialize: function() {

    InputTerminalView.__super__.initialize.call(this);

    var m = this.model;

    this.rect
      .attr("y", -4)
      .classed("terminal-input", true);

    this.rect
      .on("mouseover", function() {
        d3.select(this)
          .transition().duration(200)
          .attr("y", -8);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition().duration(200)
          .attr("y", -4);
      });

    this.updateAnchorPoints();
  }

});

