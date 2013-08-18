function WireView() {

  var line;

  function wire(selection) {

    selection.each(function (d, i) {

      line = d3.select(this).append("line")
        .attr("x1", function(d) { return d.x1; })
        .attr("y1", function(d) { return d.y1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y2", function(d) { return d.y2; })
        .attr("class", "wire");

    });

  }

  wire.updateFrom = function(x, y) {
    line
      .attr("x1", x)
      .attr("y1", y);
  };

  wire.updateTo = function(x, y) {
    line
      .attr("x2", x)
      .attr("y2", y);
  };

  wire.remove = function(){
    line.remove();
  };

  return wire;
}
