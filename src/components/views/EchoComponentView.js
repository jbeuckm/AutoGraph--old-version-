var EchoComponentView = BaseComponentView.extend({


  initialize: function() {
    BaseComponentView.prototype.initialize.call(this);

    this.listenTo(this.model, "bang", function(){

      var value = this.model.inputs["input"].model.get("value");

      var str = JSON.stringify(value, undefined, 2);
      this.echoDiv.node().innerHTML = str;
      this.render();
    });
  },

  addContent:function () {

    this.htmlHolder = this.content.append("foreignObject")
      .attr("width", 200)
      .attr("height", 150);

    this.echoDiv = this.htmlHolder.append("xhtml:body")
      .attr('xmlns','http://www.w3.org/1999/xhtml')
      .append("pre")
      .style("font-family", "courier")
      .style("font-size", "12px")
      .style("color", "#0f0")
      .attr("width", 200)
      .attr("height",150);
  }

});


