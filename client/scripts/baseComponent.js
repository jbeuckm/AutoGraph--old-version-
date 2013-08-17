function BaseComponent() {

  var width = 50, height = 15;

  function move() {
    this.parentNode.appendChild(this);
    var dragTarget = d3.select(this);

    var oldDims = dragTarget.attr("transform").replace("translate(", "").replace(")", "");
    oldDims = oldDims.split(' ');
    dragTarget
      .attr("transform", function(){
        return "translate("+(d3.event.dx+parseFloat(oldDims[0]))+" "+(d3.event.dy+parseFloat(oldDims[1]))+")";
      });
  }


  function my(selection) {
    selection.each(function (d, i) {

      var g = d3.select(this).append("g")
        .attr("transform", "translate("+d.x+" "+d.y+")")
        .call(d3.behavior.drag().on("drag", move));

      var rect = g.append("rect")
        .attr("height", 15)
        .attr("width", 60)
        .attr("class", "component");

      var text = g.append("text")
        .text(d.id)
        .attr("dx", '3')
        .attr("dy", '1em');

    });
  }

  return my;
}
