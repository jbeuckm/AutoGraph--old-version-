/**
 * @module OutputTerminalView
 * @extends TerminalView
 */
define(['views/TerminalView'], function (TerminalView) {

  /**
   * @class OutputTerminalView
   */
  return TerminalView.extend({

    initialize:function () {

      TerminalView.prototype.initialize.call(this);

      this.label.attr("dy", 32);

      this.rect
        .classed("terminal-output", true);

      this.updateAnchorPoints();
    },


    updateControlPoints:function () {
      var m = this.model;
      m.set("controlPointX", m.get("anchorX"));
      m.set("controlPointY", m.get("anchorY") + 50);
    }

  });

});
