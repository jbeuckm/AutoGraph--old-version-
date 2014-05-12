/*
 ** Peteris Krumins (peter@catonmat.net)
 ** http://www.catonmat.net  --  good coders code, great reuse
 **
 ** A simple proxy server written in node.js.
 **
 */

var http = require('http');
var sys = require('sys');
var fs = require('fs');
var url = require('url');

var blacklist = [];
var iplist = [];

fs.watchFile('./blacklist', function (c, p) {
    update_blacklist();
});
fs.watchFile('./iplist', function (c, p) {
    update_iplist();
});

function update_blacklist() {
    fs.stat('./blacklist', function (err, stats) {
        if (!err) {
            sys.log("Updating blacklist.");
            blacklist = fs.readFileSync('./blacklist').split('\n')
                .filter(function (rx) {
                    return rx.length
                })
                .map(function (rx) {
                    return RegExp(rx)
                });
        }
    });
}

function update_iplist() {
    fs.stat('./iplist', function (err, stats) {
        if (!err) {
            sys.log("Updating iplist.");
            iplist = fs.readFileSync('./iplist').split('\n')
                .filter(function (rx) {
                    return rx.length
                });
        }
    });
}

function ip_allowed(ip) {
    return true;
    for (var i in iplist) {
        if (iplist[i] == ip) {
            return true;
        }
    }
    return false;
}

function host_allowed(host) {
    for (var i in blacklist) {
        if (blacklist[i].test(host)) {
            return false;
        }
    }
    return true;
}

function deny(response, msg) {
    response.writeHead(401);
    response.write(msg);
    response.end();
}

http.createServer(function (request, response) {

    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });

    var ip = request.connection.remoteAddress;
    if (!ip_allowed(ip)) {
        msg = "IP " + ip + " is not allowed to use this proxy";
        deny(response, msg);
        sys.log(msg);
        return;
    }

    if (!host_allowed(request.url)) {
        msg = "Host " + request.url + " has been denied by proxy configuration";
        deny(response, msg);
        sys.log(msg);
        return;
    }

    var request_url = decodeURIComponent(request.url).slice(1);

    sys.log(ip + ": " + request.method + " " + request_url);

    var request_parts = url.parse(request_url);

    request.headers.Origin = 'http://';

    var options = {
        port: request_parts.port | 80,
        method: request.method,
        headers: request.headers,
        host: request_parts.host,
        path: request_parts.path
    };

    var proxy_request = http.request(options, function (stream) {

        stream.on('data', function (chunk) {
            response.write(chunk, 'binary');
        });

        stream.on('end', function () {
            response.end();
        });

    });

    proxy_request.on('error', function (error) {
        console.log(error);
    });

    proxy_request.end();


}).listen(8080);

update_blacklist();
update_iplist();

