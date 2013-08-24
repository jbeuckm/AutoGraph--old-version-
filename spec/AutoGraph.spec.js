var requirejs = require('requirejs');

requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
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

requirejs.define(["src/AutoGraph"], function (AutoGraph) {

  describe("AutoGraph", function () {


    it("instantiates an object", function () {

      var a = AutoGraph();

      expect(a).not.toEqual(null);

    });


  });

});
