function BaseComponent() {
  var width = 50,
    height = 15;

  function move() {
    this.parentNode.appendChild(this);
    var dragTarget = d3.select(this);
    dragTarget
      .attr("x", function(){return d3.event.dx + parseInt(dragTarget.attr("x"))})
      .attr("y", function(){return d3.event.dy + parseInt(dragTarget.attr("y"))});
  }


  function my(selection) {
    selection.each(function (d, i) {

      // generate chart here
      // `d` is the data, `i` is the index, `this` is the element

      var state = false;

      var rect = d3.select(this).append("rect")
        .attr("x", d.x)
        .attr("y", d.y)
        .attr("height", 15)
        .attr("width", 60)
        .attr("class", "module")
        .call(d3.behavior.drag().on("drag", move));


      function toggleState() {
        // this function updates the current instance trapped by this closure
        (state = !state)
          ? circle.style("fill", "#000")
          : circle.style("fill", "#fff");
      }
    });
  }
/*
  my.toggleState(i)
  {
    // How do I access the `i`th instance of the component here?
  }
*/
  return my;
}
