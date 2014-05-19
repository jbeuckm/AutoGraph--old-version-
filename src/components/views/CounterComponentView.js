/**
 * @class CounterComponentView
 * @type {*}
 */
var CounterComponentView = BaseComponentView.extend({

    initialize: function () {
        BaseComponentView.prototype.initialize.call(this);

        var self = this;

        this.model.on("change:count", function(){
            self.text.text(self.model.get("count"));
        });
    },


    /**
     * @method
     */
    render: function () {
        BaseComponentView.prototype.render.call(this);

        this.text.text(this.model.get("count"));
    }

});


