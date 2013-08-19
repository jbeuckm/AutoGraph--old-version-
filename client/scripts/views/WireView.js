var WireView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);
    this.line = this.d3.append("line")
      .attr("class", "wire");
  },

  render: function() {

    var m = this.model;

    if (m.get("origin") && m.get("destination")) {

      var o = m.get("origin");
      var d = m.get("destination");

      this.line
        .attr("x1", o.get("x"))
        .attr("y1", o.get("y"))
        .attr("x2", d.get("x"))
        .attr("y2", d.get("y"));
    }

  }

});
