var EchoComponentView = BaseComponentView.extend({


  initialize: function() {
    BaseComponentView.prototype.initialize.call(this);

    this.listenTo(this.model, "message", function(e){
      var str = JSON.stringify(e.input, undefined, 2);
      this.echoDiv.node().innerHTML = str;
      console.log(str);
      this.render();
    });
  },

  addContent:function () {

    this.htmlHolder = this.content.append("foreignObject")
      .attr("width", 130)
      .attr("height", 100);

    this.echoDiv = this.htmlHolder.append("xhtml:body")
      .attr('xmlns','http://www.w3.org/1999/xhtml')
      .append("div")
      .style("font-family", "courier")
      .style("font-size", "12px")
      .style("color", "#0f0")
      .attr("value", 100)
      .attr("width", 130)
      .attr("height",100);
  }

});


