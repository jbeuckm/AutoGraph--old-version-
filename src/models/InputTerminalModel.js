/**
 * @module models/TerminalModel
 *
 */
define(['models/TerminalModel'], function (TerminalModel) {

    /**
     * @class models/TerminalModel
     *
     */
    return TerminalModel.extend({

        className: "InputTerminalModel",

        /**
         * Incoming tick - set value from origin and pass on the tick event.
         *
         * @method
         */
        receiveTick: function () {
            this.get("component").receiveTick();
        },

        receiveValue: function(origin) {
            console.log("InputTerminalModel received value update");
            console.log(origin.get("value"));
            this.set("value", origin.get("value"));
        }

    });

});
