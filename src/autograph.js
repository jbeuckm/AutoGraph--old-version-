

define(['backbone', 'd3', 'models/CursorModel',
  'components/models/BaseComponent', 'models/WireModel',
  'collections/ComponentCollection', 'collections/WireCollection', 'collections/TerminalCollection',
  'components/views/BaseComponentView', 'components/views/WebviewComponentView', 'views/WireView'],
  function (Backbone, d3, CursorModel,
            BaseComponent, WireModel, ComponentCollection, WireCollection, TerminalCollection,
            BaseComponentView, WebviewComponentView, WireView) {

    return function (containerId, components, componentPath) {

      var container = d3.select("#" + containerId);
      container
        .style("position", "relative").classed("autograph", true);

      var svg = container.append("svg")
        .attr("class", "autographSVG")
        .style("position", "absolute");

      this.svg = svg;

      this.mainGroup = svg.append("g");
      this.controlLayer = this.mainGroup.append("g").attr("id", "control-layer");
      var controlTarget = this.controlLayer.append("rect")
        .style("fill", "rgba(100,100,100,.1)");

      this.wireLayer = this.mainGroup.append("g").attr("id", "wire-layer");
      this.componentLayer = this.mainGroup.append("g").attr("id", "component-layer");

      this.componentList = container.append("div")
        .attr("class", "component-list");


      this.Wires = new WireCollection();
      this.Components = new ComponentCollection();
      this.Terminals = new TerminalCollection();

      var self = this;

      function updateWindow() {
        var d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0];

        x = window.innerWidth || e.clientWidth || g.clientWidth;
        y = window.innerHeight || e.clientHeight || g.clientHeight;

        var listWidth = parseInt(self.componentList.style("width"));
        svg.attr("width", x - listWidth).attr("height", y);
        self.componentList.style("height", y);

        controlTarget
          .attr("width", x).attr("height", y);

      }

      updateWindow();
      window.onresize = updateWindow;


      var classRegistry = {};

      function getClass(className, path, callback) {
        if (classRegistry[className]) {
          callback(classRegistry[className]);
        }
        else {
          $.get(path, function (str) {
            eval(str);
            classRegistry[className] = eval(className);
            callback(classRegistry[className]);
          });
        }
      }
      this.getClass = getClass;


      d3.json(componentPath+components, function (components) {
        for (var i = 0, l = components.length; i < l; i++) {
          self.componentList.append("div")
            .attr("class", "component-option")
            .attr("id", components[i].name)
            .datum(components[i])
            .text(components[i].name);
        }
        d3.selectAll(".component-option").on("click", function() {
          self.clickComponentMenuOption(d3.select(d3.event.target).datum());
        });
      });


      this.clickComponentMenuOption = function(componentDescription) {

        self.setCursorMode({
          action:"component",
          cursor:"crosshair",
          component: componentDescription
        });
      };


      this.autographDispatch = d3.dispatch("terminal_mousedown");
      this.cursorMode = null;

      this.cursorModel = new CursorModel();

      svg.on("mousemove", function () {

        self.cursorModel.set({
          "controlPointX": self.cursorModel.get("anchorX"),
          "controlPointY": self.cursorModel.get("anchorY")
        });

        self.cursorModel.set({
          "x": d3.event.x,
          "y": d3.event.y,
          "anchorX": d3.event.x,
          "anchorY": d3.event.y
        });

      });


      // start drawing a new wire
      this.autographDispatch.on("terminal_mousedown", function (terminal) {

        if (terminal.className == "InputTerminalModel") {
          console.log("can not originate connection at input");
          return;
        }

        var newWire = new WireModel({
          originTerminalId:terminal.cid
        });

        var newWireView = new WireView({
          model:newWire,
          el:self.wireLayer.append("g")[0]
        });
        newWireView.render();

        self.setCursorMode({
          action:"wire",
          wire:newWire
        });

      });


      svg.on("mouseup", function () {

        if (!self.cursorMode) return;

        switch (self.cursorMode.action) {

          case "component":

            var position = {
              x: d3.event.x,
              y: d3.event.y
            };

            self.placeNewModel(self.cursorMode, position);

            if (!d3.event.shiftKey) {
              clearCursorMode();
            }

            break;


          case "wire":

            var originId = self.cursorMode.wire.get("originTerminalId");
            var destinationId = self.cursorModel.get("activeTerminal");

            var origin = self.Terminals.get(originId);
            var destination = self.Terminals.get(destinationId);

            if (destinationId) {
              // can't connect terminal to itself
              if (destinationId == originId) {
                self.cursorMode.wire.destroy();
              }
              // can't connect component to itself
              else if (origin.get("componentId") == destination.get("componentId")) {
                self.cursorMode.wire.destroy();
              }
              // can't connect input to input or output to output
              else if (origin.className == destination.className) {
                self.cursorMode.wire.destroy();
              }
              // ok let's do this
              else {

                self.cursorMode.wire.set("destinationTerminalId", destinationId);

                origin.on("bang", destination.receiveBang, destination);
                origin.on("change:value", destination.receiveValue, destination);
                self.cursorMode.wire.on("destroy", function () {
                  origin.off("bang", destination.receiveBang, destination);
                  origin.off("change:value", destination.receiveValue, destination);
                });

                // this makes sure the anchor points are updated before redrawing wire
                destination.get("component").trigger("change");

                self.Wires.add(self.cursorMode.wire);
              }
            }
            else {
              self.cursorMode.wire.destroy();
            }

            clearCursorMode();
            break;

        }

      });


      self.placeNewModel = function(mode, position) {

        var self = this;

        var modelClass = mode.component.model;
        var viewClass = mode.component.view;
        var fullpath = mode.component.path || "src/components/";

        getClass(modelClass, componentPath + fullpath + "models/" + modelClass + ".js?v=" + Math.random(), function (mc) {

          var model = new mc({
            autograph: self,
            x: position.x,
            y: position.y
          });
          self.Components.add(model);

          if (viewClass) {

            getClass(viewClass, componentPath + fullpath + "views/" + viewClass + ".js?v=" + Math.random(), function (vc) {
              var view = new vc({
                model:model,
                el:self.componentLayer.append("g")[0]
              });
              view.render();
            });
          }
          else {
            var view = new BaseComponentView({
              model:model,
              el:self.componentLayer.append("g")[0]
            });
            view.render();
          }

        });
      };



      self.setCursorMode = function(mode) {
        if (mode.cursor) {
          d3.select("body").style("cursor", "crosshair");
        }
        self.cursorMode = mode;
      };

      function clearCursorMode() {
        d3.select("body").style("cursor", null);
        self.cursorMode = null;
      }
      self.clearCursorMode = clearCursorMode;


        d3.select("body")
        .on("keydown", function (e) {
          if (d3.event.which == 27) {
            if (self.cursorMode.wire) {
              self.cursorMode.wire.destroy();
            }
            clearCursorMode();
          }
        });



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
      selectDragger.on("dragstart", function(){
        selectStart = {
          x: d3.event.sourceEvent.offsetX,
          y: d3.event.sourceEvent.offsetY
        };
        selectRect = self.controlLayer.append("componentPath")
          .style("stroke", '#bbb')
          .style("fill", 'none')
          .style("stroke-dasharray", ("3, 3"));
      });
      selectDragger.on("drag", function () {
        var data = [
          selectStart,
          { x:d3.event.x, y:selectStart.y},
          { x:d3.event.x, y:d3.event.y},
          { x:selectStart.x, y:d3.event.y}
        ];

        selectRect.attr("d", selectLineFunction(data));

      });
      selectDragger.on("dragend", function(){
        selectRect.remove();
      });

      controlTarget.call(selectDragger);
    };

  });
