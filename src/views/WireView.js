define(['backbone'], function (Backbone) {

  return Backbone.View.extend({

    initialize:function () {
      this.d3 = d3.select(this.el);

      this.lineFunction = d3.svg.line()
        .x(function (d) {
          return d.x;
        })
        .y(function (d) {
          return d.y;
        })
        .interpolate("bundle");

      var lineGraph = this.d3.append("path")
        .attr("class", "wire")
        .attr("fill", "none");

      this.lineGraph = lineGraph;

      var m = this.model;

      var origin = m.getOriginModel();
      var destination = m.getDestinationModel();

      origin.on("change", this.render, this);
      destination.on("change", this.render, this);

      var self = this;
      m.on("destroy", function () {
        lineGraph.remove();

        origin.off("change", self.render, self);
        destination.off("change", self.render, self);
      });

    },

    render:function () {

      var m = this.model;

      if (m.get("originTerminalId")) {

        var origin = m.getOriginModel();
        var destination = m.getDestinationModel();

        this.lineData = [
          { x:origin.get("anchorX"), y:origin.get("anchorY") },
          { x:origin.get("controlPointX"), y:origin.get("controlPointY") },
          { x:destination.get("controlPointX"), y:destination.get("controlPointY") },
          { x:destination.get("anchorX"), y:destination.get("anchorY") }
        ];

        this.lineGraph.attr("d", this.lineFunction(this.lineData));
      }

    }

  });
});
