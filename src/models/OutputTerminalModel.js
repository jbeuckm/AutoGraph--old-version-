/**
 * @module models/TerminalModel
 */
define(['models/TerminalModel'], function (TerminalModel) {

    /**
     * @class TerminalModel
     */
    return TerminalModel.extend({

        className: "OutputTerminalModel",

        /**
         * @method
         */
        initialize: function () {
            TerminalModel.prototype.initialize.call(this);

            var component = this.get("component");

            this.listenTo(component, "tick", this.sendTick);
        },

        /**
         * @method
         * @fires tick
         */
        sendTick: function () {
            this.trigger("tick");
        }

    });

});
