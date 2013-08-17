function ComponentInput() {

  function my(selection) {
    selection.each(function (d, i) {

      var rect = d3.select(this).append("rect")
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("height", 2)
        .attr("width", 8)
        .attr("class", "component-input");

      rect.on("mouseover", function(){
        d3.select(this).transition().duration(200)
          .attr("y", d.y-2)
          .attr("height", 4);
      })
        .on("mouseout", function(){
          d3.select(this).transition().duration(200)
            .attr("y", d.y)
            .attr("height", 2);
        });
    });
  }

  return my;
}
