/**
 * @class CounterComponentView
 * @type {*}
 */
var CounterComponentView = BaseComponentView.extend({

    /**
     * @method
     */
    render: function () {

        BaseComponentView.prototype.render.call(this);

        this.text.text(this.model.get("count"))

        this.model.on("change", this.render);
    }

});


