var BaseComponentView = Backbone.View.extend({

  initialize: function() {
    this.d3 = d3.select(this.el);

    var m = this.model;

    var dragger = d3.behavior.drag();
    dragger.on("drag", function(){
      this.parentNode.appendChild(this);
      var dragTarget = d3.select(this);

      var oldDims = dragTarget.attr("transform").replace("translate(", "").replace(")", "");
      oldDims = oldDims.split(' ');

      var newX = d3.event.dx+parseFloat(oldDims[0]);
      var newY = d3.event.dy+parseFloat(oldDims[1]);

      m.set("x", newX);
      m.set("y", newY);

        for (var i in inputs) {
            inputs[i].view.updateAnchorPoints();
        }
        for (var j in outputs) {
            outputs[j].view.updateAnchorPoints();
        }

      dragTarget
        .attr("transform", function(){
          return "translate("+newX+" "+newY+")";
        });
    });

    this.d3
      .call(dragger)
      .classed("component", true);

    this.rect = this.d3.append("rect")
      .attr("height", 20)
      .attr("width", 80)
      .attr("class", "component-rect");

    this.text = this.d3.append("text")
      .text(m.get("label"))
      .attr("class", "component-text")
      .attr("dx", 5)
      .attr("dy", '1em');

    var inputs = m.get("inputs");
    var outputs = m.get("outputs");

    var bb = this.text.node().getBBox();
    this.rect.attr("width", Math.max(bb.width + 10, Math.max(Object.keys(inputs).length, Object.keys(outputs).length) * 20));

    this.buildInputs(inputs);
    this.buildOutputs(outputs);
  },

  render: function() {

    var m = this.model;

    this.d3
      .attr("transform", "translate("+m.get("x")+" "+m.get("y")+")")

  },

  buildInputs: function(inputs) {
    console.log("buildInputs() with");
    console.log(this.model);
    var cnt = 0;
    for (var i in inputs) {

      var input = inputs[i];

      var im = new InputTerminalModel({
          component: this.model,
        x: cnt * 20,
        y: 0,
        label: input.label
      });

      var view = new InputTerminalView({
        model: im,
        el: this.d3.append("g")[0]
      });
      this.model.on("change", view.updateAnchorPoints, view);
      view.render();

        input.view = view;

      cnt++;
    }
  },

  buildOutputs: function(outputs) {

    console.log("buildOutputs() with");
    console.log(this.model);
    var cnt = 0;
    for (var i in outputs) {

      var output = outputs[i];

      var om = new OutputTerminalModel({
          component: this.model,
        x: cnt * 20,
        y: 20,
        label: output.label
      });

      var view = new OutputTerminalView({
        model: om,
        el: this.d3.append("g")[0]
      });
        this.model.on("change", view.updateAnchorPoints, view);
      view.render();

        output.view = view;

      cnt++;
    }
  }

});



