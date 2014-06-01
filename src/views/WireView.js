/**
 * @module WireView
 */
define(['backbone'], function (Backbone) {

    /**
     * @class WireView
     */
    return Backbone.View.extend({

        /**
         * @method
         */
        initialize: function () {
            this.d3 = d3.select(this.el);
            var m = this.model;

            this.lineFunction = d3.svg.line()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                })
                .interpolate("bundle");

            var lineGraphTarget = this.d3.append("path")
                .attr("stroke", "transparent")
                .attr("stroke-width", 10)
                .attr("fill", "none")
                .style("cursor", "pointer");

            var lineGraph = this.d3.append("path")
                .attr("class", "wire")
                .attr("fill", "none")
                .style("pointer-events", "none");


            this.listenTo(lineGraphTarget, "mouseover", function () {
                lineGraphTarget.attr("stroke", "#333");
            });
            this.listenTo(lineGraphTarget, "mouseout", function () {
                lineGraphTarget.attr("stroke", "transparent");
            });
            this.listenTo(lineGraphTarget, "contextmenu", function (data, index) {

                d3.event.preventDefault();

                if (confirm('Delete this wire?')) {
                    m.destroy();
                }
            });

            this.lineGraphTarget = lineGraphTarget;
            this.lineGraph = lineGraph;

            var origin = m.getOriginModel();
            var destination = m.getDestinationModel();

            this.listenTo(origin, "change", this.render, this);
            this.listenTo(destination, "change", this.render, this);

            var self = this;

            this.listenTo(m, "destroy", function () {
                self.d3.remove();
            });

        },

        /**
         * @method
         */
        render: function () {

            var m = this.model;

            if (m.get("originTerminalId")) {

                var origin = m.getOriginModel();
                var destination = m.getDestinationModel();

                var dx = destination.get("anchorX") - origin.get("anchorX");
                var dy = destination.get("anchorY") - origin.get("anchorY");
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 100) {

                    this.lineData = [
                        { x: origin.get("anchorX"), y: origin.get("anchorY") },
                        { x: origin.get("controlPointX"), y: origin.get("controlPointY") },
                        { x: destination.get("controlPointX"), y: destination.get("controlPointY") },
                        { x: destination.get("anchorX"), y: destination.get("anchorY") }
                    ];
                }
                else {
                    this.lineData = [
                        { x: origin.get("anchorX"), y: origin.get("anchorY") },
                        { x: destination.get("anchorX"), y: destination.get("anchorY") }
                    ];
                }

                this.lineGraph.attr("d", this.lineFunction(this.lineData));
                this.lineGraphTarget.attr("d", this.lineFunction(this.lineData));
            }

        }

    });
});
