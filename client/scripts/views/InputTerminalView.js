var InputTerminalView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);

    var m = this.model;

    this.d3
      .attr("transform", "translate("+m.get("x")+" "+m.get("y")+")")
      .classed("terminal", true);

    var rect = this.d3.append("rect")
      .attr("y", -4)
      .attr("height", 4)
      .attr("width", 15)
      .classed("component-terminal", true)
      .classed("terminal-input", true)
      .attr("data-model", m);

    rect
      .on("mouseover", function() {
        enabled = true;
        d3.select(this)
          .classed("enabled", true)
          .transition().duration(200)
          .attr("height", 8)
          .attr("y", -8);
      })
      .on("mouseout", function() {
        enabled = false;
        d3.select(this)
          .classed("enabled", false)
          .transition().duration(200)
          .attr("height", 4)
          .attr("y", -4);
      })
      .on("mousedown", function(){
        d3.event.cancelBubble = true;
        autographDispatch.terminal_mousedown(m);
      });

  }

});

