
requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: "src/"
});

require(['autograph'], function (AutoGraph) {

    window.autograph = AutoGraph;
    console.log("Initialized AutoGraph()");

});
