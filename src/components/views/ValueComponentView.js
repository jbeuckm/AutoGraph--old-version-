var ValueComponentView = BaseComponentView.extend({

  addContent:function () {

    var m = this.model;

    this.inputHolder = this.content.append("foreignObject")
      .attr("width", 130)
      .attr("height", 24);

    this.input = this.inputHolder.append("xhtml:body")
      .attr('xmlns','http://www.w3.org/1999/xhtml')
      .append("input").attr("type", "text").classed("class", "nodrag")
      .attr("value", 100)
      .attr("width", 130)
      .attr("height", 24)
      .on("keyup", function(){
        m.sendValue({output:d3.event.target.value});
      });
  }

});


