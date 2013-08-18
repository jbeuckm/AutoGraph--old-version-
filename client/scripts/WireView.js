function WireView() {

  function my(selection) {

    selection.each(function (d, i) {

      console.log("WireView gets "+JSON.stringify(d));

      var line = d3.select(this).append("line")
        .attr("x1", function(d) { return d.x1; })
        .attr("y1", function(d) { return d.y1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y2", function(d) { return d.y2; })
        .attr("class", "wire");

    });

  }

  return my;
}
