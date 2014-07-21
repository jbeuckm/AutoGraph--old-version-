/**
 * Model the connection between two particular terminals.
 *
 * @module WireModel
 */
define(['backbone'], function (Backbone) {

    /**
     * @class WireModel
     */
    return Backbone.Model.extend({

        defaults: {
            originTerminalId: null,
            destinationTerminalId: null
        },

        initialize: function(args, opts) {
            this.autograph = opts.autograph;
        },

        /**
         * @method
         * @return {*}
         */
        getOriginModel: function () {
            var o = this.get("originTerminalId");
            return(this.autograph.Terminals.get(o));
        },

        /**
         * @method
         * @return {*}
         */
        getDestinationModel: function () {
            var d = this.get("destinationTerminalId");
            if (d) {
                return(this.autograph.Terminals.get(d));
            }
            else {
                return(this.autograph.cursorModel);
            }
        }

    });
});


