/**
 * @class ValueComponentView
 * @type {*}
 */
var ValueComponentView = WebviewComponentView.extend({

    initialize: function () {
        BaseComponentView.prototype.initialize.call(this);
    },

    /**
     * @method
     */
    addContent: function () {

        WebviewComponentView.prototype.addContent.call(this);

        var m = this.model;

        this.htmlHolder
            .attr("width", 130)
            .attr("height", 24);

    },

    /**
     * @method
     */
    render: function () {
        WebviewComponentView.prototype.render.call(this);

    }

});


