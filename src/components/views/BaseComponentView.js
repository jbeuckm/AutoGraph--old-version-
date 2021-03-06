/**
 * @module BaseComponentView
 */
define(['backbone', 'views/InputTerminalView', 'views/OutputTerminalView'],
    function (Backbone, InputTerminalView, OutputTerminalView) {

        /**
         * @class BaseComponentView
         */
        return Backbone.View.extend({

            initialize: function () {
                this.d3 = d3.select(this.el);

                var m = this.model;

                var self = this;

                var dragger = d3.behavior.drag();
                dragger.on("dragstart", function () {
                    if (d3.select(d3.event.sourceEvent.target).classed("nodrag")) {
                        self.ignoreDrag = true;
                    }
                });
                dragger.on("drag", function () {

                    if (self.ignoreDrag) {
                        return;
                    }

                    this.parentNode.appendChild(this);
                    var dragTarget = d3.select(this);

                    var oldDims = dragTarget.attr("transform").replace("translate(", "").replace(")", "");
                    oldDims = oldDims.split(' ');

                    var newX = d3.event.dx + parseFloat(oldDims[0]);
                    var newY = d3.event.dy + parseFloat(oldDims[1]);

                    m.set("x", newX);
                    m.set("y", newY);

                    for (var i in inputs) {
                        inputs[i].view.updateAnchorPoints();
                    }
                    for (var j in outputs) {
                        outputs[j].view.updateAnchorPoints();
                    }

                    dragTarget
                        .attr("transform", function () {
                            return "translate(" + newX + " " + newY + ")";
                        });
                });
                // this tells the wire views to update
                dragger.on("dragend", function () {
                    m.trigger("change");
                    self.ignoreDrag = false;
                });

                this.d3
                    .call(dragger)
                    .classed("component", true);

                this.rect = this.d3.append("rect")
                    .attr("class", "component-rect");

                this.rect.on("select", function(){
                    m.set("selected", true);
                });
                this.rect.on("deselect", function(){
                    m.set("selected", false);
                });

                this.rect.on("contextmenu", function (data, index) {

                    d3.event.preventDefault();

                    if (confirm('Delete this component?')) {
                        var a = m.get("autograph");
                        self.d3.remove();
                        a.removeComponent(m);
                    }
                });

                this.rectColor = this.rect.style("stroke");

                this.content = this.d3.append("g")
                    .attr("transform", "translate(4,4)");


                this.addContent();

                var inputs = m.inputs;
                var outputs = m.outputs;

                var inputCount = Object.keys(inputs).length;
                var outputCount = Object.keys(outputs).length;

                this.minWidth = Math.max(inputCount, outputCount) * 20;

                this.inputTerminalHolder = this.d3.append("g");
                this.outputTerminalHolder = this.d3.append("g");

                this.buildInputs(inputs);
                this.buildOutputs(outputs);

                this.listenTo(m, "tick", this.hilight);

                this.listenTo(m, "change:selected", this.showSelected);
            },

            addContent: function () {
                this.text = this.content.append("text")
                    .text(this.model.label)
                    .attr("class", "component-text")
                    .attr("dy", '.9em');
            },

            hilight: function () {
                this.rect
                    .style("stroke", "#f00")
                    .transition()
                    .style("stroke", this.rectColor);
            },
            showSelected: function (e) {

                if (e.changed.selected == true) {

                    this.selectedRect = this.d3.append("rect")
                        .attr("class", "selected-rect");

                    this.selectedRect
                        .attr("transform", "translate(-8,-8)")
                        .attr("rx", 8)
                        .attr("ry", 8)
                        .attr("width", parseFloat(this.rect.attr("width")) + 16)
                        .attr("height", parseFloat(this.rect.attr("height")) + 16);
                } else {
                    this.selectedRect.remove();
                }
            },

            render: function () {

                var m = this.model;

                var bb = this.content.node().getBBox();
                var bbWidth = bb.width + 8;
                this.rect.attr("width", Math.max(bbWidth, this.minWidth));

                var bbHeight = bb.height + 8;
                this.rect.attr("height", bbHeight);

                this.outputTerminalHolder
                    .attr("transform", "translate(0, " + bbHeight + ")");

                this.d3
                    .attr("transform", "translate(" + m.get("x") + " " + m.get("y") + ")");
            },

            buildInputs: function (inputs) {

                var cnt = 0;
                for (var i in inputs) {

                    var input = inputs[i];

                    var view = new InputTerminalView({
                        autograph: this.model.get("autograph"),
                        model: input.model,
                        el: this.inputTerminalHolder.append("g")[0]
                    });

                    this.model.on("change", view.updateAnchorPoints, view);
                    view.render();

                    input.view = view;

                    cnt++;
                }
            },

            buildOutputs: function (outputs) {

                var cnt = 0;
                for (var i in outputs) {

                    var output = outputs[i];

                    var view = new OutputTerminalView({
                        autograph: this.model.get("autograph"),
                        model: output.model,
                        el: this.outputTerminalHolder.append("g")[0]
                    });
                    this.model.on("change", view.updateAnchorPoints, view);
                    view.render();

                    output.view = view;

                    cnt++;
                }
            }

        });

    });

