function BaseComponentView() {

  var g, rect;

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


  function view(selection) {
    selection.each(function (d, i) {

      g = d3.select(this).append("g")
        .attr("transform", "translate("+d.x+" "+d.y+")")
        .call(d3.behavior.drag().on("drag", move));

      rect = g.append("rect")
        .attr("height", 15)
        .attr("width", 60)
        .attr("class", "component-rect");

      var text = g.append("text")
        .text(d.id)
        .attr("class", "component-text")
        .attr("dx", '3')
        .attr("dy", '1em');


      var bb = text.node().getBBox();
      rect.attr("width", bb.width + 6);

      g.selectAll(".terminal-input").data([1, 2, 3])
        .enter()
        .append("g")
        .classed("terminal-input", true)
        .call(ComponentInputView());

      g.selectAll(".terminal-output").data([1, 2, 3])
        .enter()
        .append("g")
        .classed("terminal-output", true)
        .call(ComponentOutputView());

    });
  }

  return view;
}
