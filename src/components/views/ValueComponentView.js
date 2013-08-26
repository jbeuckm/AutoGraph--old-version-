var ValueComponentView = WebviewComponentView.extend({

  addContent:function () {

    WebviewComponentView.prototype.addContent.call(this);

    var m = this.model;

    this.htmlHolder
      .attr("width", 130)
      .attr("height", 24);

    this.textField = this.htmlBody
      .append("input")
      .attr("type", "text")
      .classed("class", "nodrag");

    this.textField
      .on("keyup", function(){
        var val = d3.event.target.value;
        console.log('setting comp value to '+val);
        m.set("value", val);
      });
  },

  render: function() {
    WebviewComponentView.prototype.render.call(this);
    this.textField
      .attr("value", this.model.get("value"));

  }

});


