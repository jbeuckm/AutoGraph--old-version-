var http = require("http");

var options = {
    host: "localhost",
    port: 8080,
    path: "http://beigerecords.com",
    headers: {
        Host: "beigerecords.com"
    }
};
http.get(options, function(res) {

    var body = '';
    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
        console.log(body);
    });

});
