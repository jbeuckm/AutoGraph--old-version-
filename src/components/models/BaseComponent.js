/**
 * Implement the logic of an AutoGraph component
 * @module BaseComponent
 */
define(['models/PositionedModel', 'models/OutputTerminalModel', 'models/InputTerminalModel'],
    function (PositionedModel, OutputTerminalModel, InputTerminalModel) {

        'use strict';

        /**
         * @constructor
         */
        return PositionedModel.extend({

            label: "component",

            inputs: {
                input: {name: "input"}
            },
            outputs: {
                output: {name: "output"}
            },

            defaults: {
            },

            /**
             * @method
             */
            initialize: function () {
                this.buildInputs(this.inputs);
                this.buildOutputs(this.outputs);
            },

            /**
             * A tick was received at one of the inputs. Process the inputs and pass on the tick.
             *
             * @method
             */
            receiveTick: function () {
                var inputTerminalValues = this.readInputValues();
                var self = this;

                this.process(inputTerminalValues, function (results) {

                    self.updateOutputTerminals(results);
                    self.sendTick();
                });
            },

            /**
             * @method
             */
            readInputValues: function () {

                var ins = {};
                for (var key in this.inputs) {
                    var inputModel = this.inputs[key].model;
                    if (inputModel.get("value")) {
                        ins[key] = inputModel.get("value");
                    }
                }
                console.log("component "+this.label+" sees inputs ==>");
                console.log(ins);
                return ins;
            },

            /**
             * @method
             */
            updateOutputTerminals: function (values) {

                for (var key in values) {
                    var output = this.outputs[key];
                    if (output) {
                        console.log("setting output terminal value ["+values[key]+"] for key ["+key+"]");
                        output.model.set("value", values[key]);
                    }
                }
            },

            /**
             * @method
             */
            process: function (args, callback) {
                callback(args);
            },

            /**
             * @method
             */
            sendTick: function () {
                this.trigger("tick");
            },


            /**
             * @method
             */
            buildInputs: function (inputs) {

                var cnt = 0;
                for (var i in inputs) {

                    var input = inputs[i];

                    var im = new InputTerminalModel({
                        autograph: this.get("autograph"),
                        component: this,
                        x: cnt * 20,
                        y: 0,
                        name: input.name
                    });

//                    this.listenTo(im, "tick", this.receiveTick);
                    this.listenTo(im, "change:value", function () {
                        console.log("basecomp setting " + input.name + " to " + im.get("value"));
                        this.set(input.name, im.get("value"));
                    });

                    input.model = im;

                    this.get("autograph").Terminals.add(im);

                    cnt++;
                }
            },

            /**
             * @method
             */
            buildOutputs: function (outputs) {

                var cnt = 0;
                for (var i in outputs) {

                    var output = outputs[i];

                    var om = new OutputTerminalModel({
                        autograph: this.get("autograph"),
                        component: this,
                        x: cnt * 20,
                        y: 0,
                        name: output.name
                    });

                    output.model = om;

                    this.get("autograph").Terminals.add(om);

                    cnt++;
                }
            }

        });

    });


