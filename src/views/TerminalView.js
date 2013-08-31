define(['backbone'], function (Backbone) {

  return Backbone.View.extend({

    initialize:function () {
      this.d3 = d3.select(this.el);

      var m = this.model;

      this.d3
        .attr("transform", "translate(" + m.get("x") + " " + m.get("y") + ")")
        .classed("terminal", true);

      this.rect = this.buildRect();

      this.label = this.d3.append("text")
        .classed("terminal-label", true)
        .text(m.get("name"))
        .style("visibility", "hidden");

      this.listenTo(m, "change", this.updateAnchorPoints);
    },


    buildRect:function () {
      var self = this;

      var m = this.model;

      var rect = this.d3.append("rect")
        .attr("height", 4)
        .attr("width", 15)
        .classed("component-terminal", true)
        .attr("data-model", this.model);

      rect
        .on("mouseover", function () {

          self.label.style("visibility", "visible");

          enabled = true;
          m.get("autograph").cursorModel.set("activeTerminal", m);
          d3.select(this)
            .classed("enabled", true)
            .transition().duration(200)
            .attr("height", 8);
        })
        .on("mouseout", function () {

          self.label.style("visibility", "hidden");

          enabled = false;
          m.get("autograph").cursorModel.set("activeTerminal", null);
          d3.select(this)
            .classed("enabled", false)
            .transition().duration(200)
            .attr("height", 4);
        })
        .on("mousedown", function () {
          d3.event.cancelBubble = true;
          self.updateAnchorPoints();
          m.get("autograph").autographDispatch.terminal_mousedown(m);
        });

      return rect;
    },


    updateAnchorPoints:function () {


      function getBoundingBoxInArbitrarySpace(element,mat){
        var svgRoot = element.ownerSVGElement;
        var bbox = element.getBBox();

        var cPt1 =  svgRoot.createSVGPoint();
        cPt1.x = bbox.x;
        cPt1.y = bbox.y;
        cPt1 = cPt1.matrixTransform(mat);

        // repeat for other corner points and the new bbox is
        // simply the minX/minY  to maxX/maxY of the four points.
        var cPt2 = svgRoot.createSVGPoint();
        cPt2.x = bbox.x + bbox.width;
        cPt2.y = bbox.y;
        cPt2 = cPt2.matrixTransform(mat);

        var cPt3 = svgRoot.createSVGPoint();
        cPt3.x = bbox.x;
        cPt3.y = bbox.y + bbox.height;
        cPt3 = cPt3.matrixTransform(mat);

        var cPt4 = svgRoot.createSVGPoint();
        cPt4.x = bbox.x + bbox.width;
        cPt4.y = bbox.y + bbox.height;
        cPt4 = cPt4.matrixTransform(mat);

        var points = [cPt1,cPt2,cPt3,cPt4]

        //find minX,minY,maxX,maxY
        var minX=Number.MAX_VALUE;
        var minY=Number.MAX_VALUE;
        var maxX=0
        var maxY=0
        for(i=0;i<points.length;i++)
        {
          if (points[i].x < minX)
          {
            minX = points[i].x
          }
          if (points[i].y < minY)
          {
            minY = points[i].y
          }
          if (points[i].x > maxX)
          {
            maxX = points[i].x
          }
          if (points[i].y > maxY)
          {
            maxY = points[i].y
          }
        }

        //instantiate new object that is like an SVGRect
        var newBBox = {"x":minX,"y":minY,"width":maxX-minX,"height":maxY-minY}
        return newBBox;
      }

      function getBBoxInScreenSpace(element){
        return getBoundingBoxInArbitrarySpace(element,element.getScreenCTM());
      }

      var m = this.model;

      var pos = getBBoxInScreenSpace(this.rect.node());

      m.set("anchorX", pos.x + pos.width / 2);
      m.set("anchorY", pos.y + pos.height / 2);

      this.updateControlPoints();
    }

  });
});

