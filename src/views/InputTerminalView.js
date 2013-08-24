define(['views/TerminalView'], function (TerminalView) {
  return TerminalView.extend({

    initialize:function () {

      TerminalView.prototype.initialize.call(this);

      this.rect
        .attr("y", -4)
        .classed("terminal-input", true);

      var m = this.model;

      this.rect
        .on("mouseover", function () {
          enabled = true;
          m.get("autograph").cursorModel.set("activeTerminal", m);
          d3.select(this)
            .transition().duration(200)
            .attr("y", -8)
            .attr("height", 8);
        })
        .on("mouseout", function () {
          enabled = true;
          m.get("autograph").cursorModel.set("activeTerminal", null);
          d3.select(this)
            .transition().duration(200)
            .attr("y", -4)
            .attr("height", 4);
        });

      this.updateAnchorPoints();
    },

    updateControlPoints:function () {
      var m = this.model;
      m.set("controlPointX", m.get("anchorX"));
      m.set("controlPointY", m.get("anchorY") - 50);
    }

  });

});
