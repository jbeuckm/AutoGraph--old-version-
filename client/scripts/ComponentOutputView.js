function ComponentOutputView() {

  function view(selection) {

    var enabled = false;

    selection.each(function (d, i) {

      var rect = d3.select(this).append("rect")
        .attr("x", i * 14)
        .attr("y", 15)
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
    });

  }

  view.getAttachPoint = function() {
    return {
      x: 5,
      y: 18
    }
  };

  return view;
}
