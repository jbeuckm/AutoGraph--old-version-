/*
** Peteris Krumins (peter@catonmat.net)
** http://www.catonmat.net  --  good coders code, great reuse
**
** A simple proxy server written in node.js.
**
*/

var http = require('http');
var sys  = require('sys');
var fs   = require('fs');
var url = require('url');

var blacklist = [];
var iplist    = [];

fs.watchFile('./blacklist', function(c,p) { update_blacklist(); });
fs.watchFile('./iplist', function(c,p) { update_iplist(); });

function update_blacklist() {
  fs.stat('./blacklist', function(err, stats) {
    if (!err) {
      sys.log("Updating blacklist.");
      blacklist = fs.readFileSync('./blacklist').split('\n')
                  .filter(function(rx) { return rx.length })
                  .map(function(rx) { return RegExp(rx) });
    }
  });
}

function update_iplist() {
  fs.stat('./iplist', function(err, stats) {
    if (!err) {
      sys.log("Updating iplist.");
      iplist = fs.readFileSync('./iplist').split('\n')
               .filter(function(rx) { return rx.length });
    }
  });
}

function ip_allowed(ip) {
    return true;
  for (i in iplist) {
    if (iplist[i] == ip) {
      return true;
    }
  }
  return false;
}

function host_allowed(host) {
  for (i in blacklist) {
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

http.createServer(function(request, response) {
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

  sys.log(ip + ": " + request.method + " " + request.url);

        var options = {
            port: 80,
            host: request.headers['host'],
            method: request.method,
            headers: request.headers,
            path: url.parse(request.url).pathname
        };
console.log(options);

  var proxy_request = http.request(options, function(res) {

console.log(res);

  });
//      proxy.request(request.method, request.url, request.headers);

/*
  proxy_request.addListener('response', function(proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
*/


        proxy_request.on('error', function(error) {
            console.log(error);
        });

        proxy_request.end();


}).listen(8080);

update_blacklist();
update_iplist();

