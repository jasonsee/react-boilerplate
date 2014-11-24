var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5000;
var env = process.env.NODE_ENV || 'development';
var staticPath = env === 'production' ? './dist' : './client/public';
var fs = require('fs');
var request = require('request');

// ******** PROXY ********* //
var API = 'http://localhost:8000';

app.all('/api/*', function(req, res) {
    console.log('[' + req.method + ']: ' + API + req.url);
    req.pipe(request({
        headers: req.headers,
        url: API + req.url,
        method: req.method,
        body: req.body
    })).pipe(res);
});
// ************************ //

app.use('/', express['static'](staticPath));

app.get("*", function(req, res) {
    res.writeHeader(200, {"Content-Type": 'text/html'});
    fs.createReadStream(__dirname + '/views/index.html').pipe(res);
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
    console.log('NODE_ENV = ' + env);
});
