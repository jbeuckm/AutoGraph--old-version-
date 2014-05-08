/**
 * @class
 * @extends WebviewComponentView
 * @type {*}
 */
var HTTPClientComponentView = WebviewComponentView.extend({

  addContent:function () {

    WebviewComponentView.prototype.addContent.call(this);

    this.htmlHolder
      .attr("width", 100)
      .attr("height", 20);

    this.select = this.htmlBody
      .append("select")
      .attr("class", "nodrag");

    this.select.selectAll("option")
      .data(["GET","POST","PUT","DELETE"])
      .enter()
      .append("option")
      .attr("value", function(d){return d;})
      .text(function(d){return d;});
  }

});
