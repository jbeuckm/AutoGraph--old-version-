requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: "./",
    paths: {
        "underscore": "lib/underscore-min",
        "jquery": "lib/jquery-1.10.2.min",
        "backbone": "lib/backbone-min",
        "d3": "lib/d3.min"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'd3': {
            exports: 'd3'
        }
    }
});

define(['backbone', 'd3', 'models/CursorModel',
  'components/models/BaseComponent', 'models/WireModel',
  'collections/ComponentCollection', 'collections/WireCollection', 'collections/TerminalCollection',
  'components/views/BaseComponentView', 'components/views/WebviewComponentView', 'views/WireView'],
  function (Backbone, d3, CursorModel,
            BaseComponent, WireModel, ComponentCollection, WireCollection, TerminalCollection,
            BaseComponentView, WebviewComponentView, WireView) {

    return function (containerId, components, path) {

      var container = d3.select("#" + containerId);
      container
        .style("position", "relative");

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

      var componentList = container.append("div")
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

        var listWidth = parseInt(componentList.style("width"));
        svg.attr("width", x - listWidth).attr("height", y);
        componentList.style("height", y);

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


      d3.json(path+components, function (components) {
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

            var modelClass = cursorMode.component.model;
            var viewClass = cursorMode.component.view;
            var fullpath = cursorMode.component.path || "src/components/";

            getClass(modelClass, path + fullpath + "models/" + modelClass + ".js?v=" + Math.random(), function (mc) {

              var model = new mc({
                autograph:this,
                x:clickX,
                y:clickY
              });
              self.Components.add(model);

              if (viewClass) {

                  getClass(viewClass, path + fullpath + "views/" + viewClass + ".js?v=" + Math.random(), function (vc) {
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

                origin.on("bang", destination.receiveBang, destination);
                origin.on("change:value", destination.receiveValue, destination);
                cursorMode.wire.on("destroy", function () {
                  origin.off("bang", destination.receiveBang, destination);
                  origin.off("change:value", destination.receiveValue, destination);
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
        selectRect = controlLayer.append("path")
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
