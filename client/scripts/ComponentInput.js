function ComponentInput() {

  function my(selection) {
    selection.each(function (d, i) {

      var rect = d3.select(this).append("rect")
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("height", 2)
        .attr("width", 8)
        .attr("class", "component-input");

    });
  }

  return my;
}
