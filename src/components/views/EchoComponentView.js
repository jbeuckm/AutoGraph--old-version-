/**
 * @class EchoComponentView
 * @extends WebviewComponentView
 * @type {*}
 */
var EchoComponentView = WebviewComponentView.extend({

  /**
   * @method
   */
  initialize: function() {
    WebviewComponentView.prototype.initialize.call(this);

    this.listenTo(this.model, "bang", function(){

      this.render();
    });
  },

  /**
   * @method
   */
  render: function() {
    WebviewComponentView.prototype.render.call(this);

    var value = this.model.get("value");
    if (value != undefined) {
      var str = JSON.stringify(value, undefined, 2);
      this.echoDiv.node().innerHTML = str;
    }
  },

  /**
   * @method
   */
  addContent:function () {

    WebviewComponentView.prototype.addContent.call(this);

    this.htmlHolder
      .attr("width", 200)
      .attr("height", 150);

    this.echoDiv = this.htmlBody
      .append("pre")
      .style("font-family", "courier")
      .style("font-size", "12px")
      .style("color", "#0f0")
      .attr("width", 200)
      .attr("height",150);
  }

});


