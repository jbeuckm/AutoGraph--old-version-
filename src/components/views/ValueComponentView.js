/**
 * @class ValueComponentView
 * @type {*}
 */
var ValueComponentView = WebviewComponentView.extend({

    initialize: function () {
        BaseComponentView.prototype.initialize.call(this);

        this.textField.node().focus();
    },

    /**
     * @method
     */
    addContent: function () {

        WebviewComponentView.prototype.addContent.call(this);

        var m = this.model, self = this;

        this.htmlHolder
            .attr("width", 130)
            .attr("height", 24);

        this.textField = this.htmlBody
            .append("input")
            .attr("type", "text")
            .attr("class", "nodrag");

        this.textField
            .on("keyup", function () {
                var val = d3.event.target.value;
                m.set("value", val);
            });

        m.on("change:value", function(e) {
            self.textField.attr("value", m.get("value"));
        });
    },

    /**
     * @method
     */
    render: function () {
        WebviewComponentView.prototype.render.call(this);
        this.textField
            .attr("value", this.model.get("value"));

    }

});


