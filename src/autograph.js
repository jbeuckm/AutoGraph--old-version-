define(['backbone', 'd3', 'models/CursorModel',
  'models/components/BaseComponent', 'models/WireModel',
  'collections/ComponentCollection', 'collections/WireCollection', 'collections/TerminalCollection',
  'views/components/BaseComponentView', 'views/WireView'],
  function (Backbone, d3, CursorModel, BaseComponent, WireModel, ComponentCollection, WireCollection, TerminalCollection, BaseComponentView, WireView) {

    return function (containerId) {

      var container = d3.select("#" + containerId);
      container
        .style("position", "relative");

      var svg = container.append("svg")
        .attr("class", "autographSVG")
        .style("position", "absolute");

      this.svg = svg;

      this.mainGroup = svg.append("g");
      this.wireLayer = this.mainGroup.attr("id", "wire-layer");
      this.componentLayer = this.mainGroup.append("g").attr("id", "component-layer");

      var componentList = container.append("div")
        .attr("class", "component-list");


      this.Wires = new WireCollection();
      this.Components = new ComponentCollection();
      this.Terminals = new TerminalCollection();


      function updateWindow() {
        var d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0];

        x = window.innerWidth || e.clientWidth || g.clientWidth;
        y = window.innerHeight || e.clientHeight || g.clientHeight;

        var listWidth = parseInt(componentList.style("width"));
        svg.attr("width", x - listWidth).attr("height", y);
        componentList.style("height", y);
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


      d3.json('components.json', function (components) {
        for (var i = 0, l = components.length; i < l; i++) {
          componentList.append("div")
            .attr("class", "component-option")
            .attr("id", components[i].name)
            .datum(components[i])
            .text(components[i].name);
        }
        d3.selectAll(".component-option").on("click", function () {

          setCursorMode({
            action:"component",
            cursor:"crosshair",
            component:d3.select(d3.event.target).datum()
          });

        });
      });


      this.autographDispatch = d3.dispatch("terminal_mousedown");
      var cursorMode = null;

      var cursorModel = new CursorModel();
      this.cursorModel = cursorModel;

      svg.on("mousemove", function () {

        cursorModel.set({
          "controlPointX": cursorModel.get("anchorX"),
          "controlPointY": cursorModel.get("anchorY")
        });

        cursorModel.set({
          "x": d3.event.x,
          "y": d3.event.y,
          "anchorX": d3.event.x,
          "anchorY": d3.event.y
        });

      });

      var self = this;

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

        setCursorMode({
          action:"wire",
          wire:newWire
        });

      });


      svg.on("mouseup", function () {

        if (!cursorMode) return;

        switch (cursorMode.action) {

          case "component":

            var clickX = d3.event.x;
            var clickY = d3.event.y;
            var shiftKey = d3.event.shiftKey;

            var className = cursorMode.component.model;
            var path = cursorMode.component.path || "src/models/components/";

            getClass(className, path + className + ".js?v=" + Math.random(), function (c) {

              var model = new c({
                autograph:this,
                x:clickX,
                y:clickY
              });

              self.Components.add(model);

              var view = new BaseComponentView({
                model:model,
                el:this.componentLayer.append("g")[0]
              });
              view.render();

              if (!shiftKey) {
                clearCursorMode();
              }

            });

            break;


          case "wire":

            var originId = cursorMode.wire.get("originTerminalId");
            var destinationId = cursorModel.get("activeTerminal");

            var origin = self.Terminals.get(originId);
            var destination = self.Terminals.get(destinationId);

            if (destinationId) {
              // can't connect terminal to itself
              if (destinationId == originId) {
                cursorMode.wire.destroy();
              }
              // can't connect component to itself
              else if (origin.get("componentId") == destination.get("componentId")) {
                cursorMode.wire.destroy();
              }
              // can't connect input to input or output to output
              else if (origin.className == destination.className) {
                cursorMode.wire.destroy();
              }
              // ok let's do this
              else {

                cursorMode.wire.set("destinationTerminalId", destinationId);

                origin.on("message", destination.receiveMessage, destination);
                cursorMode.wire.on("destroy", function () {
                  origin.off("message", destination.receiveMessage, destination);
                });

                // this makes sure the anchor points are updated before redrawing wire
                destination.get("component").trigger("change");

                self.Wires.add(cursorMode.wire);
              }
            }
            else {
              cursorMode.wire.destroy();
            }

            clearCursorMode();
            break;

        }

      });


      function setCursorMode(mode) {
        if (mode.cursor) {
          d3.select("body").style("cursor", "crosshair");
        }
        cursorMode = mode;
      }

      function clearCursorMode() {
        d3.select("body").style("cursor", null);
        cursorMode = null;
      }


      d3.select("body")
        .on("keydown", function (e) {
          if (d3.event.which == 27) {
            if (cursorMode.wire) {
              cursorMode.wire.destroy();
            }
            clearCursorMode();
          }
        });

    }

  });
