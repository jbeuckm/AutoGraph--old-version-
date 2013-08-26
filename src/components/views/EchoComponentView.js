var EchoComponentView = BaseComponentView.extend({


  initialize: function() {
    BaseComponentView.prototype.initialize.call(this);

    this.listenTo(this.model, "bang", function(){

      this.render();
    });
  },

  render: function() {
    BaseComponentView.prototype.render.call(this);

    var value = this.model.get("value");
    if (value != undefined) {
      var str = JSON.stringify(value, undefined, 2);
      this.echoDiv.node().innerHTML = str;
    }
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


