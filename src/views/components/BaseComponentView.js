define(['backbone', 'views/InputTerminalView', 'views/OutputTerminalView'],
  function (Backbone, InputTerminalView, OutputTerminalView) {

  return Backbone.View.extend({

    initialize:function () {
      this.d3 = d3.select(this.el);

      var m = this.model;

      var dragger = d3.behavior.drag();
      dragger.on("drag", function () {
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

      this.d3
        .call(dragger)
        .classed("component", true);

      this.rect = this.d3.append("rect")
        .attr("height", 20)
        .attr("width", 80)
        .attr("class", "component-rect");

      this.content = this.d3.append("g");

      this.text = this.content.append("text")
        .text(m.get("name"))
        .attr("class", "component-text")
        .attr("dx", 5)
        .attr("dy", '1em');

      var inputs = m.get("inputs");
      var outputs = m.get("outputs");

      var inputCount = Object.keys(inputs).length;
      var outputCount = Object.keys(outputs).length;

      this.minWidth = Math.max(inputCount, outputCount) * 20;

      this.inputTerminalHolder = this.d3.append("g");
      this.outputTerminalHolder = this.d3.append("g");

      this.buildInputs(inputs);
      this.buildOutputs(outputs);

      this.listenTo(m, "message", this.hilight);
    },

    hilight:function () {
      var c = this.rect.style("stroke");
      this.rect
        .style("stroke", "#f00")
        .transition()
        .style("stroke", c);
    },

    render:function () {

      var m = this.model;

      var bb = this.content.node().getBBox();
      this.rect.attr("width", Math.max(bb.width + 10, this.minWidth));

      var height = bb.height + 3;
      this.rect.attr("height", height);

      this.outputTerminalHolder
        .attr("transform", "translate(0, "+height+")");

      this.d3
        .attr("transform", "translate(" + m.get("x") + " " + m.get("y") + ")");
    },

    buildInputs:function (inputs) {

      var cnt = 0;
      for (var i in inputs) {

        var input = inputs[i];

        var view = new InputTerminalView({
          autograph: this.model.get("autograph"),
          model:input.model,
          el:this.inputTerminalHolder.append("g")[0]
        });

        this.model.on("change", view.updateAnchorPoints, view);
        view.render();

        input.view = view;

        cnt++;
      }
    },

    buildOutputs:function (outputs) {

      var cnt = 0;
      for (var i in outputs) {

        var output = outputs[i];

        var view = new OutputTerminalView({
          autograph: this.model.get("autograph"),
          model:output.model,
          el:this.outputTerminalHolder.append("g")[0]
        });
        this.model.on("change", view.updateAnchorPoints, view);
        view.render();

        output.view = view;

        cnt++;
      }
    }

  });

});

