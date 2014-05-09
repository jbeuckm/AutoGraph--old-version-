/*
 * Draw a dashed line rect when clicking and dragging across the autograph SVG
 *
 * @module SelectionTool
 */
define(['d3'], function (d3) {

    return function (controlLayer) {

        var selectLineFunction = d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .interpolate("linear-closed");

        var selectStart = null;
        var selectRect = null;

        var selectDragger = d3.behavior.drag();
        selectDragger.on("dragstart", function () {
            selectStart = {
                x: d3.event.sourceEvent.offsetX,
                y: d3.event.sourceEvent.offsetY
            };
            selectRect = controlLayer.append("path")
                .style("stroke", '#bbb')
                .style("fill", 'none')
                .style("stroke-dasharray", ("3, 3"));
        });
        selectDragger.on("drag", function () {
            var data = [
                selectStart,
                { x: d3.event.x, y: selectStart.y},
                { x: d3.event.x, y: d3.event.y},
                { x: selectStart.x, y: d3.event.y}
            ];
            selectRect.attr("d", selectLineFunction(data));
        });
        selectDragger.on("dragend", function () {
            selectRect.remove();
        });

        return selectDragger;
    }

});
