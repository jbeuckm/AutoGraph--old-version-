var TerminalView = Backbone.View.extend({

    initialize: function() {
        this.d3 = d3.select(this.el);

        var m = this.model;

        this.d3
            .attr("transform", "translate("+m.get("x")+" "+m.get("y")+")")
            .classed("terminal", true);

        this.rect = this.buildRect();
    },


    buildRect: function() {
        this.d3 = d3.select(this.el);

        var m = this.model;

        var rect = this.d3.append("rect")
            .attr("height", 4)
            .attr("width", 15)
            .classed("component-terminal", true)
            .attr("data-model", this.model);

        rect
            .on("mouseover", function() {
                enabled = true;
                cursorModel.set("activeTerminal", m);
                d3.select(this)
                    .classed("enabled", true)
                    .transition().duration(200)
                    .attr("height", 8);
            })
            .on("mouseout", function() {
                enabled = false;
                cursorModel.set("activeTerminal", null);
                d3.select(this)
                    .classed("enabled", false)
                    .transition().duration(200)
                    .attr("height", 4);
            })
            .on("mousedown", function(){
                d3.event.cancelBubble = true;
                autographDispatch.terminal_mousedown(m);
            });

        return rect;
    },


    updateAnchorPoints: function() {

        var m = this.model;

        var bb = this.rect.node().getBBox();
        console.log('bb');
        console.log(bb);
        m.set("anchorX", bb.x + bb.width/2);
        m.set("anchorY", bb.y + bb.height/2);

    }

});
