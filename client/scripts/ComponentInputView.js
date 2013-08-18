function ComponentInputView() {

  function view(selection) {

    var enabled = false;

    selection.each(function (d, i) {

      var rect = d3.select(this).append("rect")
        .attr("x", i * 14)
        .attr("y", -3)
        .attr("height", 3)
        .attr("width", 10)
        .classed("component-terminal", true)
        .classed("terminal-input", true);

      rect
        .on("mouseover", function() {
          enabled = true;
          d3.select(this)
            .classed("enabled", true)
            .transition().duration(200)
            .attr("y", -6)
            .attr("height", 6);
        })
        .on("mouseout", function() {
          enabled = false;
          d3.select(this)
            .classed("enabled", false)
            .transition().duration(200)
            .attr("y", -3)
            .attr("height", 3);
        })
        .on("mousedown", function(){
          console.log('input mouse down');
          d3.event.cancelBubble = true;
        });
    });

  }

  view.getAttachPoint = function() {
    return {
      x: 5,
      y: -3
    }
  };

  return view;
}
