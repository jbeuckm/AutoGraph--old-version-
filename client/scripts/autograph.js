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
  .append("select")
  .style("position", "absolute")
  .style("right", 0)
  .attr("multiple", "true");

function updateWindow() {
  x = w.innerWidth || e.clientWidth || g.clientWidth;
  y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  svg.attr("width", x - rightMenuWidth).attr("height", y);
  moduleList.style("width", rightMenuWidth).style("height", y);
}

updateWindow();
window.onresize = updateWindow;

svg.on("click", function(e) {

  svg.append("svg:rect")
    .attr("x", d3.event.x)
    .attr("y", d3.event.y)
    .attr("height", 40)
    .attr("width", 40)
    .attr("class", "module")
    .call(d3.behavior.drag().on("drag", move));

});

function move() {
  this.parentNode.appendChild(this);
  var dragTarget = d3.select(this);
  dragTarget
    .attr("x", function(){return d3.event.dx + parseInt(dragTarget.attr("x"))})
    .attr("y", function(){return d3.event.dy + parseInt(dragTarget.attr("y"))});
}


$(document).ready(function(){
  $.get(AUTOGRAPH_SERVER+'modules.json', function(response){
    var modules = JSON.parse(response);
    for (var i= 0, l=modules.length; i<l; i++) {
      moduleList.append("option")
        .text(modules[i].name);
    }
  });
});
