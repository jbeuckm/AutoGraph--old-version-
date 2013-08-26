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

    callback( args );
  }

});
