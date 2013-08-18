function WireView() {

  var line;

  function my(selection) {

    selection.each(function (d, i) {

      console.log("WireView gets "+JSON.stringify(d));

      line = d3.select(this).append("line")
        .attr("x1", function(d) { return d.x1; })
        .attr("y1", function(d) { return d.y1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y2", function(d) { return d.y2; })
        .attr("class", "wire");

    });

  }

  my.update = function(x, y) {
    console.log('update wire');
    line
      .attr("x2", x)
      .attr("y2", y);
  };

  return my;
}
