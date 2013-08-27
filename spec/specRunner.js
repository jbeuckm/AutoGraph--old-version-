
require.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    "underscore": "../src/lib/underscore-min",
    "jquery": "../src/lib/jquery-1.10.2.min",
    "backbone": "../src/lib/backbone-min",
    "d3": "../src/lib/d3.min",
    'jasmine': '../src/lib/jasmine/jasmine',
    'jasmine-html': '../src/lib/jasmine/jasmine-html',
    'require': '../src/require',
    src: "../src/"

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
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('AutoGraph.spec');

  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});
