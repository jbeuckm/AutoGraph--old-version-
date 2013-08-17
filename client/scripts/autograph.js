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

var moduleList = d3.select("#container")
  .append("div")
  .attr("class", "module-list");

function updateWindow() {
  x = w.innerWidth || e.clientWidth || g.clientWidth;
  y = w.innerHeight || e.clientHeight || g.clientHeight;

  var listWidth = parseInt(moduleList.style("width"));
  svg.attr("width", x - listWidth).attr("height", y);
  moduleList.style("height", y);
}

updateWindow();
window.onresize = updateWindow;

svg.on("mouseup", function (e) {

  var c = BaseComponent();

  svg.data([
    {x:d3.event.x, y:d3.event.y}
  ])
    .call(c);

});


$(document).ready(function () {
  $.get(AUTOGRAPH_SERVER + 'modules.json', function (response) {
    var modules = JSON.parse(response);
    for (var i = 0, l = modules.length; i < l; i++) {
      moduleList.append("div")
        .attr("class", "module-option")
        .attr("id", modules[i].id)
        .text(modules[i].id);
    }
    d3.selectAll(".module-option").on("click", function () {
      console.log(d3.event.target.id);
      d3.select("body").style("cursor", "crosshair");
    });
  });
});


d3.select("body")
  .on("keydown", function (e) {
    if (d3.event.which == 27) {
      alert('escape');
    }
  });

