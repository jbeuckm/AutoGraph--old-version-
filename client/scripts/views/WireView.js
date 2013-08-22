var WireView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);

      this.lineFunction = d3.svg.line()
           .x(function(d) { return d.x; })
           .y(function(d) { return d.y; })
           .interpolate("bundle");

      var lineGraph = this.d3.append("path")
          .attr("class", "wire")
          .attr("fill", "none");

      this.lineGraph = lineGraph;

    var m = this.model;

    var o = m.get("originTerminalId");
    var origin = Terminals.get(o);
    var d = m.get("destinationTerminalId");
    var destination;
    if (d) {
      destination = Terminals.get(d);
    }
    else {
      destination = cursorModel;
    }

    origin.on("change", this.render, this);
    destination.on("change", this.render, this);

    var self = this;
    m.on("destroy", function() {
      lineGraph.remove();

      origin.off("change", self.render, self);
      destination.off("change", self.render, self);
    });

  },

    render: function() {

        var m = this.model;

        if (m.get("origin") && m.get("destination")) {

            var origin = m.get("origin");
            var destination = m.get("destination");

            this.lineData = [
              { x: origin.get("anchorX"), y: origin.get("anchorY") },
              { x: origin.get("controlPointX"), y: origin.get("controlPointY") },
              { x: destination.get("controlPointX"), y: destination.get("controlPointY") },
              { x: destination.get("anchorX"), y: destination.get("anchorY") }
            ];

            this.lineGraph.attr("d", this.lineFunction(this.lineData));
        }

    },


  set: function(key, value, options) {
    var m = this.model;
    switch (key) {
        case "origin":
            m.get("origin").off("change", this.render, this);
            break;
        case "destination":
            m.get("destination").off("change", this.render, this);
            break;
    }
    var status = Backbone.Model.prototype.set.call(this, value, options);
    switch (key) {
        case "origin":
            m.get("origin").on("change", this.render, this);
            break;
        case "destination":
            m.get("destination").on("change", this.render, this);
            break;
    }
    return status;
  }


});
