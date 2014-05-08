var HTTPClientComponent = BaseComponent.extend({

  label: "HTTP Client",

  inputs: {
    method: {name: "method"},
    server: {name: "server"},
    port: {name: "port"},
    path: {name: "path"},
    headers: {name: "headers"},
    params: {name: "params"},
    body: {name: "body"}
  },
  outputs: {
    status: {name: "status"},
    headers: {name: "headers"},
    body: {name: "body"}
  },

  process:function (args, callback) {

    console.log(args);

    var url = this.buildUrl(args);
    console.log(url);

    $.ajax(url, {

    })
    .done(function() {
        console.log(this);
        callback( args );
    })
    .fail(function() {
        console.log(this);
    });

  },

  buildUrl: function(args) {
    var url = "http://" + args.server;
    if (args.port) url += ':'+args.port;
    url += '/';
    return url;
  }

});
