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

var wireLayer = svg.append("g");

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
      action:"place",
      cursor:"crosshair",
      component:d3.event.target.id
    });

  });
});


var autographDispatch = d3.dispatch("output_mousedown");
var cursorMode = null;

// start drawing a new wire
autographDispatch.on("output_mousedown", function (t) {

  console.log("output_mousedown ");
  console.log(t);
  console.log(d3.event);

  var newWireData = { x1:d3.event.x, y1:d3.event.y, x2:d3.event.x, y2:d3.event.y };
  var newWire = WireView();
  wireLayer.data([newWireData]).call(newWire);

  setCursorMode({
    action:"wire",
    data:newWireData,
    wire:newWire,
    mousemove:function (x, y) {
      newWire.updateTo(x, y);
    }
  });

});


svg.on("mousemove", function () {
  if (cursorMode && cursorMode.mousemove) {
    cursorMode.mousemove(d3.event.x, d3.event.y);
  }
});

svg.on("mouseup", function () {

  if (!cursorMode) return;

  switch (cursorMode.action) {

    case "place":
      var c = BaseComponentView();

      svg.data([
        {
          id:cursorMode.component,
          x:d3.event.x,
          y:d3.event.y
        }
      ])
        .call(c);

      if (!d3.event.shiftKey) {
        clearCursorMode();
      }
      break;

    case "wire":

      d3.selectAll("g.terminal-input.enabled").each(function(d, i){
console.log(i);
      });

      cursorMode.wire.remove();

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
      clearCursorMode();
    }
  });

