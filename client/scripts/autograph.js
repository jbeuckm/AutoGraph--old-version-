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

svg.on("mouseup", function () {


  if (cursorMode) {

    var c = BaseComponent();

    svg.data([
      {
        id: cursorMode.component,
        x: d3.event.x,
        y: d3.event.y
      }
    ])
      .call(c);

    if (!d3.event.shiftKey) {
      clearCursorMode();
    }
  }

});


d3.json(AUTOGRAPH_SERVER + 'components.json', function (components) {
  for (var i = 0, l = components.length; i < l; i++) {
    componentList.append("div")
      .attr("class", "component-option")
      .attr("id", components[i].id)
      .text(components[i].id);
  }
  d3.selectAll(".component-option").on("click", function () {

    setCursorMode({
      cursor: "crosshair",
      component: d3.event.target.id
    });

  });
});

var cursorMode = null;

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

