

d3.select("#container").style("position", "relative");

var svg = d3.select("#container")
  .append("svg")
  .attr("class", "autographSVG")
  .style("position", "absolute");

var wireLayer = svg.append("g").attr("id", "wire-layer");

var componentList = d3.select("#container")
  .append("div")
  .attr("class", "component-list");


var Wires = new WireCollection();
var Components = new ComponentCollection();
var Terminals = new TerminalCollection();


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
    $.get(path, function(str) {
      eval(str);
      classRegistry[className] = eval(className);
      callback(classRegistry[className]);
    });
  }
}


d3.json(AUTOGRAPH_SERVER + 'components.json', function (components) {
  for (var i = 0, l = components.length; i < l; i++) {
    componentList.append("div")
      .attr("class", "component-option")
      .attr("id", components[i].name)
      .datum(components[i])
      .text(components[i].name);
  }
  d3.selectAll(".component-option").on("click", function () {

    setCursorMode({
      action: "component",
      cursor: "crosshair",
      component: d3.select(d3.event.target).datum()
    });

  });
});


var autographDispatch = d3.dispatch("terminal_mousedown");
var cursorMode = null;

var cursorModel = new CursorModel();

svg.on("mousemove", function () {

  cursorModel.set("controlPointX", cursorModel.get("anchorX"));
  cursorModel.set("controlPointY", cursorModel.get("anchorY"));

  cursorModel.set("x", d3.event.x);
    cursorModel.set("y", d3.event.y);
    cursorModel.set("anchorX", d3.event.x);
    cursorModel.set("anchorY", d3.event.y);

});



// start drawing a new wire
autographDispatch.on("terminal_mousedown", function (terminal) {

  var newWire = new WireModel({
    originTerminalId: terminal.cid
  });

  var newWireView = new WireView({
    model: newWire,
    el: wireLayer.append("g")[0]
  });
  newWireView.render();

  setCursorMode({
    action: "wire",
    wire: newWire
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
      var path = cursorMode.component.path;

      getClass(className, path + className+".js?v="+Math.random(), function(c){

        var model = new c({
          x: clickX,
          y: clickY
        });

        Components.add(model);

        var view = new BaseComponentView({
          model: model,
          el: svg.append("g")[0]
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

      var origin = Terminals.get(originId);
      var destination = Terminals.get(destinationId);

      if (destinationId) {
        if (destinationId == originId) {
          cursorMode.wire.destroy();
        }
        else if (origin.get("componentId") == destination.get("componentId")) {
          alert("Direct component feedback not allowed at the moment.");
          cursorMode.wire.destroy();
        }
        else {
          cursorMode.wire.set("destinationTerminalId", destinationId);
          Wires.add(cursorMode.wire);
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
  console.log("setCursorMode");
  if (mode.cursor) {
    d3.select("body").style("cursor", "crosshair");
  }
  cursorMode = mode;
}

function clearCursorMode() {
  console.log("clearCursorMode");
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

