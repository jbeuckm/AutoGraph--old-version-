var BaseComponentView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);
  },

  render: function() {

    var m = this.model;

    this.d3
      .attr("transform", "translate("+m.get("x")+" "+m.get("y")+")")
      .call(d3.behavior.drag().on("drag", move));

    this.rect = this.d3.append("rect")
      .attr("height", 15)
      .attr("width", 60)
      .attr("class", "component-rect");

    this.text = this.d3.append("text")
      .text(m.get("label"))
      .attr("class", "component-text")
      .attr("dx", '3')
      .attr("dy", '1em');

    var inputs = m.get("inputs");
    var outputs = m.get("inputs");

    var bb = this.text.node().getBBox();
    this.rect.attr("width", Math.max(bb.width + 6, Math.max(inputs.length, outputs.length) * 14));

  }
});


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



function xBaseComponentView() {

  var g, rect;

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


      var inputs = [
        {
          name: ""
        },
        {
          name: ""
        }
      ];

      var outputs = [
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ];

      var bb = text.node().getBBox();
      rect.attr("width", Math.max(bb.width + 6, Math.max(inputs.length, outputs.length) * 14));


      g.selectAll(".terminal-input").data(inputs)
        .enter()
        .append("g")
        .classed("terminal-input", true)
        .call(ComponentInputView());

      g.selectAll(".terminal-output").data(outputs)
        .enter()
        .append("g")
        .classed("terminal-output", true)
        .call(ComponentOutputView());

    });
  }

  return view;
}
