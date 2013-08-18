function ComponentOutputView() {

  function my(selection) {

    var $self = this;
    var enabled = false;

    selection.each(function (d, i) {

      var rect = d3.select(this).append("rect")
        .attr("x", i * 12)
        .attr("y", 15)
        .attr("height", 3)
        .attr("width", 10)
        .attr("class", "component-terminal");

      rect
        .on("mouseover", function() {
          enabled = true;
          d3.select(this).transition().duration(200)
            .attr("height", 6);
        })
        .on("mouseout", function() {
          enabled = false;
          d3.select(this).transition().duration(200)
            .attr("height", 3);
        })
        .on("mousedown", function(){
          console.log('output mouse down');
          d3.event.cancelBubble = true;

          autographDispatch.terminal_mousedown($self);
        });
    });

  }

  return my;
}
