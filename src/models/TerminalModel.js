/**
 * @module TerminalModel
 */
define(['models/PositionedModel'],
    function (PositionedModel) {

        /**
         * @class TerminalModel
         */
        return PositionedModel.extend({

            defaults: {
                name: "terminal",
                componentId: null,

                anchorX: 0,
                anchorY: 0,
                controlPointX: 0,
                controlPointY: 0
            },

            /**
             * @method
             */
            initialize: function (args, opts) {
                this.autograph = opts.autograph;
                this.component = opts.component;
                this.set("componentId", this.component.cid);
            }

        });
    });

