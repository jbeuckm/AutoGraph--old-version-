requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "src/",
    paths: {
        "underscore": "lib/underscore-min",
        "jquery": "lib/jquery-1.10.2.min",
        "backbone": "lib/backbone-min",
        "localstorage": "lib/backbone.localStorage-min",
        "d3": "lib/d3.min",
        "q": "lib/q"
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
        'q': {
            exports: 'Q'
        }
    }
});

require(['autograph'], function (AutoGraph) {

    window.autograph = AutoGraph;

});
