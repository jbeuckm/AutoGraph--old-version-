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
         * @method
         */
        receiveTick: function () {
            this.trigger("tick");
        },

        /**
         * @method
         * @param origin
         */
        receiveValue: function (origin) {
            console.log("InputTerminalModel received value update");
            console.log(origin.get("value"));
            this.set("value", origin.get("value"));
        }

    });

});
