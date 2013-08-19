var WireView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);
    var line = this.d3.append("line")
      .attr("class", "wire");
    this.line = line;

    var m = this.model;

    var self = this;

    m.get("destination").on("change", function(){
      self.render();
    });

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

      this.line
        .attr("x1", origin.x)
        .attr("y1", origin.y)
        .attr("x2", destination.x)
        .attr("y2", destination.y);
    }

  }

});
