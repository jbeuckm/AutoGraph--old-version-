var WireView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);
    var line = this.d3.append("line")
      .attr("class", "wire");
    this.line = line;

    var m = this.model;

    m.get("destination").on("change", this.render, this);

    m.on("destroy", function() {
      console.log("destroy wire");
      line.remove();
    });

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
