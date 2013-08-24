var ButtonComponentView = BaseComponentView.extend({

  addContent:function () {
    this.text = this.content.append("text")
      .text(this.model.get("name"))
      .attr("class", "component-text")
      .attr("dy", '.75em');
  },

  hilight:function () {
    var c = this.rect.style("stroke");
    this.rect
      .style("stroke", "#f00")
      .transition()
      .style("stroke", c);
  },

  render:function () {

    var m = this.model;

    var bb = this.content.node().getBBox();
    this.rect.attr("width", Math.max(bb.width + 8, this.minWidth));

    var height = bb.height + 3;
    this.rect.attr("height", height);

    this.outputTerminalHolder
      .attr("transform", "translate(0, " + height + ")");

    this.d3
      .attr("transform", "translate(" + m.get("x") + " " + m.get("y") + ")");
  },



});


