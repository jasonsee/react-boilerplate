var express = require('express');
var app = express();
var path = require('path');
var port = 2000;
var env = process.env.NODE_ENV || 'development';
var staticPath = env === 'production' ? './dist' : './client/public';
var fs = require('fs');
var request = require('request');


var pushStatePath = /^(?!\/public)(?!\/src)(?!.*html)(?!.*xml).*/;
var staticRoot = path.join(__dirname, '..', 'client');

// ******** PROXY ********* //
var API = 'http://atcpoc1:8080/DSS';

app.all('/api/*', function(req, res) {
    console.log('[' + req.method + ']: ' + API + req.url);
    req.pipe(request({
        headers: req.headers,
        url: API + req.url,
        method: req.method,
        body: req.body
    })).pipe(res);
});

var MONKEYPOD = 'https://monkeypod.io:443/mpapi/DSServices/CCTR/CallCenter/api';
app.all('/monkeypod/*', function(req, res) {

    var url = req.url.replace('/monkeypod', '');

    console.log('[' + req.method + ']: ' + MONKEYPOD + url);
    req.pipe(request({
        headers: req.headers,
        url: MONKEYPOD + url,
        method: req.method,
        body: req.body
    })).pipe(res);
});
// ************************ //

app.all(pushStatePath, function (req, res) {
    res.sendfile(staticRoot + '/index.html');
});


var config = require('../config');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpackConfig');


// Create our webpack server, this will host our static files
var server = new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    contentBase: './client',
    noContentBase: false
});

// Allow webpack to use our app server for things it cant find statically
server.app.use(app);

server.listen(config.port, 'localhost', function (err, result) {
    if (err) { return console.log(err); }
    console.log('Listening at localhost:'+config.port);
});


