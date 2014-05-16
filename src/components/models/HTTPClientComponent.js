var HTTPClientComponent = BaseComponent.extend({

    label: "HTTP Client",

    inputs: {
        method: {name: "method"},
        hostname: {name: "hostname"},
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

    initialize: function() {

        BaseComponent.prototype.initialize.call(this);

        $.ajaxPrefilter(function( options ) {
            if ( options.crossDomain ) {
                options.url = "http://localhost:8080/" + encodeURIComponent( options.url );
            }
        });

    },

    process: function (args, callback) {

        console.log(args);

        var url = this.buildUrl(args);
        console.log(url);

        var self = this;

        $.ajax(url, {
            crossDomain: true,
            complete: function(e, xhr, settings){

                self.outputs.status.model.set("value", e.status);
                self.outputs.headers.model.set("value", e.getAllResponseHeaders());
                self.outputs.body.model.set("value", e.responseText);

                callback(args);
            }
        })
            .fail(function () {
                console.log(this);
            });

    },

    buildUrl: function (args) {
        var url = "http://" + args.hostname;
        if (args.port) {
            url += ':' + args.port;
        }
        url += '/';
        return url;
    }

});
