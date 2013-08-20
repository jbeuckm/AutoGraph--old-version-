var WireView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);

      this.lineFunction = d3.svg.line()
           .x(function(d) { return d.x; })
           .y(function(d) { return d.y; })
           .interpolate("linear");

      var lineGraph = this.d3.append("path")
          .attr("class", "wire")
          .attr("fill", "none");

      this.lineGraph = lineGraph;

    var m = this.model;

    m.get("destination").on("change", this.render, this);

    m.on("destroy", function() {
      lineGraph.remove();
    });

  },

    render: function() {

        var m = this.model;
//console.log('render WireView');
        if (m.get("origin") && m.get("destination")) {

            var origin = m.get("origin");
            var destination = m.get("destination");
//            console.log('origin: '+origin);
//            console.log('destination: '+destination);

            this.lineData = [
                { x: origin.get("anchorX"), y: origin.get("anchorY") },
                { x: destination.get("anchorX"), y: destination.get("anchorY") }
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
