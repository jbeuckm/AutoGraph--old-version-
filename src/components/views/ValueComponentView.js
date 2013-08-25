var ValueComponentView = BaseComponentView.extend({

  addContent:function () {

    var m = this.model;

    this.inputHolder = this.content.append("foreignObject")
      .attr("width", 130)
      .attr("height", 24);

    this.textField = this.inputHolder.append("xhtml:body")
      .attr('xmlns','http://www.w3.org/1999/xhtml')
      .append("input").attr("type", "text").classed("class", "nodrag")
      .attr("width", 130)
      .attr("height", 24)
      .on("keyup", function(){
        var val = d3.event.target.value;
        console.log('setting comp value to '+val);
        m.set("value", val);
      });
  },

  render: function() {
    BaseComponentView.prototype.render.call(this);
    this.textField
      .attr("value", this.model.get("value"));

  }

});


