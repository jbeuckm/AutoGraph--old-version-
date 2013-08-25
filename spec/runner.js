requirejs.config({
  urlArgs:"bust=" + (new Date()).getTime(),
  baseUrl:"../src/",
  paths:{

    "jquery":"lib/jquery-1.10.2.min",
    "jasmine":'lib/jasmine/jasmine',
    "jasmine-html":'lib/jasmine/jasmine-html',
    "spec":'../spec/',

    "underscore":"lib/underscore-min",
    "backbone":"lib/backbone-min",
    "d3":"lib/d3.min"
  },
  shim:{

    jasmine:{
      exports:'jasmine'
    },
    'jasmine-html':{
      deps:['jasmine'],
      exports:'jasmine'
    },

    'backbone':{
      deps:['underscore', 'jquery'],
      exports:'Backbone'
    },
    'underscore':{
      exports:'_'
    },
    'd3':{
      exports:'d3'
    }
  }
});


require(['jquery', 'jasmine-html'], function ($, jasmine) {

  global.initBackbone = function () {
    global.initDOM();
    global.Backbone = require('backbone');
    global.Backbone.setDomLibrary(jQuery);
  }

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function (spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('AutoGraph.spec');


  $(function () {
    require(specs, function (spec) {
      jasmineEnv.execute();
    });
  });

});
