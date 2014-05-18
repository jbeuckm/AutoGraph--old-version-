/**
 * @class ValueComponentView
 * @type {*}
 */
var ValueComponentView = BaseComponentView.extend({

    initialize: function () {
        BaseComponentView.prototype.initialize.call(this);
    },

    /**
     * @method
     */
    addContent: function () {

        BaseComponentView.prototype.addContent.call(this);

        var m = this.model;

        this.htmlHolder
            .attr("width", 130)
            .attr("height", 24);

    },

    /**
     * @method
     */
    render: function () {
        BaseComponentView.prototype.render.call(this);

        this.text.text(this.model.get("count"));
    }

});


