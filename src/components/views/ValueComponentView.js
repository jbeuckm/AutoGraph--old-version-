var ValueComponentView = BaseComponentView.extend({

  addContent:function () {

    var m = this.model;

    this.inputHolder = this.content.append("foreignObject")
      .attr("width", 130)
      .attr("height", 24);

    this.input = this.inputHolder.append("xhtml:body")
      .append("xhtml:body")
      .attr('xmlns','http://www.w3.org/1999/xhtml')
      .html("<input type='text' />")
      .attr("width", 130)
      .attr("height", 24)
      .on("mousedown", function() { d3.event.stopPropagation(); });
  }

});


