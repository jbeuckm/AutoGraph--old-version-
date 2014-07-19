/**
 * @module autograph
 */
define(['backbone', 'd3', 'models/CursorModel', 'ComponentLibrary', 'SelectionTool',
    'components/models/BaseComponent', 'models/WireModel',
    'collections/ComponentCollection', 'collections/WireCollection', 'collections/TerminalCollection',
    'components/views/BaseComponentView', 'components/views/WebviewComponentView', 'views/WireView'],
    function (Backbone, d3, CursorModel, ComponentLibrary, SelectionTool, BaseComponent, WireModel, ComponentCollection, WireCollection, TerminalCollection, BaseComponentView, WebviewComponentView, WireView) {

        /**
         * Establish the SVG and component library for the autograph.
         * @constructor
         */
        return function (containerId, components, componentPath) {

            var self = this;

            var container = d3.select("#" + containerId)
                .style("position", "relative")
                .classed("autograph", true);


            /**
             * @method
             * @param componentDescription
             */
            self.clickComponentMenuOption = function (componentDescription) {
                self.setCursorMode({
                    action: "component",
                    cursor: "crosshair",
                    component: componentDescription
                });
            };

            this.componentLibrary = new ComponentLibrary(container, components, componentPath, self.clickComponentMenuOption);

            var svg = container.append("svg")
                .attr("class", "autographSVG")
                .style("position", "absolute");

            this.svg = svg;

            this.mainGroup = svg.append("g");
            this.controlLayer = this.mainGroup.append("g").attr("id", "control-layer");
            this.controlTarget = this.controlLayer.append("rect").style("fill", "rgba(100,100,100,.1)");

            this.wireLayer = this.mainGroup.append("g").attr("id", "wire-layer");
            this.componentLayer = this.mainGroup.append("g").attr("id", "component-layer");


            this.Wires = new WireCollection();
            this.Components = new ComponentCollection();
            this.Terminals = new TerminalCollection();


            /**
             * @method
             */
            self.resizeWindow = function () {
                var d = document,
                    e = d.documentElement,
                    g = d.getElementsByTagName('body')[0];

                x = window.innerWidth || e.clientWidth || g.clientWidth;
                y = window.innerHeight || e.clientHeight || g.clientHeight;

                var listWidth = parseInt(self.componentLibrary.componentList.style("width"));
                svg.attr("width", x - listWidth).attr("height", y);
                self.componentLibrary.componentList.style("height", y);

                self.controlTarget.attr("width", x).attr("height", y);

            };

            self.resizeWindow();
            window.onresize = self.resizeWindow;

            this.cursorMode = null;

            this.cursorModel = new CursorModel();

            /**
             * @method
             */
            self.mouseDown = function () {
                if (d3.select(d3.event.target).classed("component-terminal")) {
                    var terminalId = d3.event.target.dataset.terminal;
                    var terminal = self.Terminals.get(terminalId);
                    self.terminalMouseDown(terminal);
                }
            };
            this.componentLayer.on("mousedown", self.mouseDown);

            /**
             * Start drawing a new wire.
             *
             * @method
             */
            self.terminalMouseDown = function (terminal) {

                if (terminal.className === "InputTerminalModel") {
                    console.log("can not originate connection at input");
                    return;
                }

                // update the anchor points to draw the temp wire
                terminal.get("component").trigger("change");

                var newWire = new WireModel({
                    autograph: self,
                    originTerminalId: terminal.cid
                });

                var newWireView = new WireView({
                    model: newWire,
                    el: self.wireLayer.append("g")[0]
                });
                newWireView.render();

                self.setCursorMode({
                    action: "wire",
                    wire: newWire,
                    wireView: newWireView
                });

            };


            /**
             * @method
             */
            self.mouseMove = function () {

                self.cursorModel.set({
                    controlPointX: self.cursorModel.get("anchorX"),
                    controlPointY: self.cursorModel.get("anchorY")
                });

                self.cursorModel.set({
                    x: d3.event.offsetX,
                    y: d3.event.offsetY,
                    anchorX: d3.event.offsetX,
                    anchorY: d3.event.offsetY
                });

            };
            svg.on("mousemove", self.mouseMove);

            /**
             * @method
             * @listens mouseup
             */
            self.mouseUp = function () {

                if (!self.cursorMode) {
                    return;
                }

                switch (self.cursorMode.action) {

                    case "component":

                        var position = {
                            x: d3.event.offsetX,
                            y: d3.event.offsetY
                        };

                        self.componentLibrary.loadComponentClasses(self.cursorMode.component)
                            .then(function (loaded) {
                                self.placeNewModel(loaded.modelClass, loaded.viewClass || BaseComponentView, position);
                            })
                            .fail(function(err){
                                alert(err);
                            });

                        if (!d3.event.shiftKey) {
                            self.clearCursorMode();
                        }

                        break;


                    case "wire":

                        self.cursorMode.wireView.stopListening(self.cursorModel);

                        var originId = self.cursorMode.wire.get("originTerminalId");
                        var destinationId = self.cursorModel.get("activeTerminal");

                        if (destinationId) {
                            self.placeNewWire(originId, destinationId);
                        }
                        else {
                            self.cursorMode.wire.destroy();
                        }

                        self.clearCursorMode();
                        break;

                }

            };
            svg.on("mouseup", self.mouseUp, self);


            /**
             * @method
             * @param originId
             * @param destinationId
             * @return {*}
             */
            self.placeNewWire = function (originId, destinationId) {

                var origin = self.Terminals.get(originId);
                origin.get("component").trigger("change");
                var destination = self.Terminals.get(destinationId);
                destination.get("component").trigger("change");

                // can't connect terminal to itself
                if (destinationId === originId) {
                    self.cursorMode.wire.destroy();
                }
                // can't connect component to itself
                else if (origin.get("componentId") === destination.get("componentId")) {
                    self.cursorMode.wire.destroy();
                }
                // can't connect input to input or output to output
                else if (origin.className === destination.className) {
                    self.cursorMode.wire.destroy();
                }
                // ok let's do this
                else {

                    self.cursorMode.wire.set("destinationTerminalId", destinationId);

                    var newWireView = self.cursorMode.wireView;
                    newWireView.listenTo(destination, "change", newWireView.render);
                    newWireView.render();

                    destination.listenTo(origin, "tick", destination.receiveTick);
                    destination.receiveValue(origin);
                    destination.listenTo(origin, "change:value", destination.receiveValue);

                    self.cursorMode.wire.on("destroy", function () {
                        destination.stopListening(origin);
                    });

                    self.Wires.add(self.cursorMode.wire);

                    return self.cursorMode.wire;
                }
            };


            /**
             * @method
             *
             * @param modelClass
             * @param viewClass
             * @param position
             *
             * @return {BaseComponent}
             */
            self.placeNewModel = function (modelClass, viewClass, position) {

                var self = this;

                var model = new modelClass({
                    autograph: self,
                    x: position.x,
                    y: position.y
                });
                self.Components.add(model);

                var view = new viewClass({
                    model: model,
                    el: self.componentLayer.append("g")[0]
                });
                view.render();

                return model;
            };

            /**
             * @method
             *
             * @param componentModel
             */
            self.removeComponent = function (componentModel) {
                componentModel.destroy();
            };


            /**
             * Update the model and view of the cursor.
             * @method
             * @param mode
             */
            self.setCursorMode = function (mode) {
                if (mode.cursor) {
                    d3.select("body").style("cursor", "crosshair");
                }
                self.cursorMode = mode;
            };

            /**
             * Return to default cursor mode
             * @method
             */
            self.clearCursorMode = function () {
                d3.select("body").style("cursor", null);
                self.cursorMode = null;
            };


            /**
             * @method
             * @param e
             */
            self.handleKeyDown = function (e) {
                switch (d3.event.which) {

                    // escape
                    case 27:
                        if (self.cursorMode.wire) {
                            self.cursorMode.wire.destroy();
                        }
                        self.clearCursorMode();
                        break;

                    // delete
                    case 46:

                        d3.selectAll(".component-rect").each(function(){
                            event.initEvent("delete",true,true);
                            this.dispatchEvent(event);
                        });

                        break;
                }

            };
            d3.select("body").on("keydown", self.handleKeyDown);


            var selectionTool = SelectionTool(self.controlLayer);

            self.controlTarget.call(selectionTool);

            selectionTool.dispatch.on("change", function(e){

                d3.selectAll(".component-rect").each(function(){

                    var event = document.createEvent("SVGEvents");

                    var bb = this.getBoundingClientRect();

                    if (
                        (bb.left >= e.left) &&
                        (bb.right <= e.right) &&
                        (bb.top >= e.top) &&
                        (bb.bottom <= e.bottom)) {

                        event.initEvent("select",true,true);
                        this.dispatchEvent(event);
                    } else {
                        event.initEvent("deselect",true,true);
                        this.dispatchEvent(event);
                    }

            });
            });

        };

    });
