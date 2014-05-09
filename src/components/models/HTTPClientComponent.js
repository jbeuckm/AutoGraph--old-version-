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

    initialize: function() {

        BaseComponent.prototype.initialize.call(this);

        $.ajaxPrefilter(function( options ) {
            if ( options.crossDomain ) {
                options.url = "http://localhost:8080/" + encodeURIComponent( options.url );
                options.crossDomain = false;
/*
                options.headers = {
                    host: options.url.split('/')[2]
                }
*/
            }
        });

        $.ajaxSetup({
            "beforeSend": function(xhr) {

                xhr.setRequestHeader("host", 'usbpi.us');

            }
        });
    },

    process: function (args, callback) {

        console.log(args);

        var url = this.buildUrl(args);
        console.log(url);

        $.ajax(url, {
            crossDomain: true
        })
            .done(function () {
                console.log(this);
                callback(args);
            })
            .fail(function () {
                console.log(this);
            });

    },

    buildUrl: function (args) {
        var url = "http://" + args.server;
        if (args.port) url += ':' + args.port;
        url += '/';
        return url;
    }

});
