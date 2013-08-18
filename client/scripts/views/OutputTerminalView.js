var OutputTerminalView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);
  },

  render: function() {

    var m = this.model;

    this.d3
      .attr("transform", "translate("+m.get("x")+" "+m.get("y")+")")
      .classed("terminal", true);

    var rect = this.d3.append("rect")
      .attr("height", 3)
      .attr("width", 10)
      .classed("component-terminal", true)
      .classed("terminal-output", true);

    rect
      .on("mouseover", function() {
        enabled = true;
        d3.select(this)
          .classed("enabled", true)
          .transition().duration(200)
          .attr("height", 6);
      })
      .on("mouseout", function() {
        enabled = false;
        d3.select(this)
          .classed("enabled", false)
          .transition().duration(200)
          .attr("height", 3);
      })
      .on("mousedown", function(){
        d3.event.cancelBubble = true;
        autographDispatch.output_mousedown(this);
      });

  }

});

