var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0];


var width, height, rightMenuWidth = 150;

d3.select("#container").style("position", "relative");

var svg = d3.select("#container")
  .append("svg")
  .attr("class", "autographSVG")
  .style("position", "absolute");

var wireLayer = svg.append("g").attr("id", "wire-layer");

var componentList = d3.select("#container")
  .append("div")
  .attr("class", "component-list");

function updateWindow() {
  x = w.innerWidth || e.clientWidth || g.clientWidth;
  y = w.innerHeight || e.clientHeight || g.clientHeight;

  var listWidth = parseInt(componentList.style("width"));
  svg.attr("width", x - listWidth).attr("height", y);
  componentList.style("height", y);
}

updateWindow();
window.onresize = updateWindow;


d3.json(AUTOGRAPH_SERVER + 'components.json', function (components) {
  for (var i = 0, l = components.length; i < l; i++) {
    componentList.append("div")
      .attr("class", "component-option")
      .attr("id", components[i].id)
      .text(components[i].id);
  }
  d3.selectAll(".component-option").on("click", function () {

    setCursorMode({
      action: "place",
      cursor: "crosshair",
      component: d3.event.target.id
    });

  });
});


var autographDispatch = d3.dispatch("terminal_mousedown");
var cursorMode = null;

var cursorModel = new CursorModel();

svg.on("mousemove", function () {

    cursorModel.set("x", d3.event.x);
    cursorModel.set("y", d3.event.y);
    cursorModel.set("anchorX", d3.event.x);
    cursorModel.set("anchorY", d3.event.y);

});



// start drawing a new wire
autographDispatch.on("terminal_mousedown", function (terminal) {

  var newWire = new WireModel({
    origin: terminal,
    destination: cursorModel
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

    case "place":

      var model = new BaseComponentModel({
        label: cursorMode.component,
        x: d3.event.x,
        y: d3.event.y
      });

      var view = new BaseComponentView({
        model: model,
        el: svg.append("g")[0]
      });
      view.render();

      if (!d3.event.shiftKey) {
        clearCursorMode();
      }
      break;

    case "wire":

      var t = cursorModel.get("activeTerminal");
      if (t) {
        cursorMode.wire.set("destination", t);
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

