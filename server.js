'use strict';
var http = require('http');
var fs = require('fs');

var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.write(fs.readFileSync('demo.html'));
    res.end();
}).listen(port);
