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
        initialize: function (args, opts) {
            TerminalModel.prototype.initialize.call(this, args, opts);

            var component = this.component;

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
