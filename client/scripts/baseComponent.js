function BaseComponent() {

  var width = 50, height = 15;

  function move() {
    this.parentNode.appendChild(this);
    var dragTarget = d3.select(this);
    dragTarget
      .attr("x", function(){return d3.event.dx + parseInt(dragTarget.attr("x"))})
      .attr("y", function(){return d3.event.dy + parseInt(dragTarget.attr("y"))});
  }


  function my(selection) {
    selection.each(function (d, i) {

      var state = false;

      var rect = d3.select(this).append("rect")
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("height", 15)
        .attr("width", 60)
        .attr("class", "module")
        .call(d3.behavior.drag().on("drag", move));

    });
  }

  return my;
}
