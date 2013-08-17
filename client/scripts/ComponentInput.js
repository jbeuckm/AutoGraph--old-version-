function ComponentInput() {

  function my(selection) {
    selection.each(function (d, i) {

      var rect = d3.select(this).append("rect")
        .attr("height", 2)
        .attr("width", 4)
        .attr("class", "component-input");

    });
  }

  return my;
}
