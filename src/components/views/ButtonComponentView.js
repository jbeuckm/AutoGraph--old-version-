var ButtonComponentView = BaseComponentView.extend({

  addContent:function () {

    var m = this.model;

    this.button = this.content.append("rect")
      .attr("width", 50)
      .attr("height", 50)
      .style("fill", "#555")
      .style("cursor", "pointer")
      .on("click", function(){
        m.sendBang();
      });
  },

  hilight:function () {

    BaseComponentView.prototype.hilight.call(this);

    this.button
      .style("fill", "#fff")
      .transition().duration(500)
      .style("fill", "#555");
  }

});


