var config = require('./config');

var request = require('request');
var path = require('path');
var express = require('express');
var app = express();

// ******** PROXY ********* //

app.all('/api/*', function(req, res) {
    console.log('[' + req.method + ']: ' + config.apiUrl + req.url);
    req.pipe(request({
        headers: req.headers,
        url: config.apiUrl + req.url,
        method: req.method,
        body: req.body
    })).pipe(res);
});
// ************************ //

app.listen(config.port, function() {
    console.log('Listening on port ' + config.port);
    console.log('NODE_ENV = ' + config.env);
});
