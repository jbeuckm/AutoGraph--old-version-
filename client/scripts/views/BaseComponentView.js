var BaseComponentView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);
  },

  render: function() {

    var m = this.model;

    this.d3
      .attr("transform", "translate("+m.get("x")+" "+m.get("y")+")")
      .call(d3.behavior.drag().on("drag", _autograph_component_move))
      .classed("component", true);

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
    var outputs = m.get("outputs");

    var bb = this.text.node().getBBox();
    this.rect.attr("width", Math.max(bb.width + 6, Math.max(inputs.length, outputs.length) * 14));

    this.renderInputs(inputs);
    this.renderOutputs(outputs);
  },

  renderInputs: function(inputs) {

    for (var i= 0, l=inputs.length; i<l; i++) {

      var input = inputs[i];

      var im = new InputTerminalModel({
        x: i * 14,
        y: 0,
        label: input.label
      });

      var view = new InputTerminalView({
        model: im,
        el: this.d3.append("g")[0]
      });
      view.render();

    }
  },

  renderOutputs: function(outputs) {

    for (var i= 0, l=outputs.length; i<l; i++) {

      var output = outputs[i];

      var om = new OutputTerminalModel({
        x: i * 14,
        y: 15,
        label: output.label
      });

      var view = new OutputTerminalView({
        model: om,
        el: this.d3.append("g")[0]
      });
      view.render();

    }
  }

});


function _autograph_component_move() {
  this.parentNode.appendChild(this);
  var dragTarget = d3.select(this);

  var oldDims = dragTarget.attr("transform").replace("translate(", "").replace(")", "");
  oldDims = oldDims.split(' ');
  dragTarget
    .attr("transform", function(){
      return "translate("+(d3.event.dx+parseFloat(oldDims[0]))+" "+(d3.event.dy+parseFloat(oldDims[1]))+")";
    });
}
