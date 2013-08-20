var WireView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);

      this.lineFunction = d3.svg.line()
           .x(function(d) { return d.x; })
           .y(function(d) { return d.y; })
           .interpolate("linear");

      this.lineGraph = this.d3.append("path")
          .attr("class", "wire")
          .attr("fill", "none");

    var m = this.model;

    m.get("destination").on("change", this.render, this);

    m.on("destroy", function() {
      console.log("destroy wire");
      line.remove();
    });

  },

    render: function() {

        var m = this.model;

        if (m.get("origin") && m.get("destination")) {

            var origin = m.get("origin").getAnchorCoords();
            var destination = m.get("destination").getAnchorCoords();

            this.lineData = [
                { x: origin.x, y: origin.y },
                { x: destination.x, y: destination.y }
            ];

            this.lineGraph.attr("d", this.lineFunction(this.lineData));
        }

    },


    set: function(key, value, options) {
    var m = this.model;
    switch (key) {
      case "destination":
        m.get("destination").off("change", this.render, this);
        break;
    }
    var status = Backbone.Model.prototype.set.call(this, value, options);
    switch (key) {
      case "destination":
        m.get("destination").on("change", this.render, this);
        break;
    }
    return status;
  }


});
