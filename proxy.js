var express = require('express');
var app = express();
var path = require('path');

var pushStatePath = /^(?!\/public)(?!\/src)(?!.*html)(?!.*xml).*/;
var staticRoot = path.join(__dirname, '.', 'client');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config');
var webpackConfig = require('./webpackConfig');

var API = config.apiUrl;
var MONKEYPOD = config.monkeypodUrl;

// ******** PROXY ********* //

// request('/api/session/login')
app.all('/api/*', function(req, res) {
    console.log('[' + req.method + ']: ' + API + req.url);
    req.pipe(request({
        headers: req.headers,
        url: API + req.url,
        method: req.method,
        body: req.body
    })).pipe(res);
});

// request('/monkeypod/session/login')
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

// Set up push state so it will work with webpack
app.all(pushStatePath, function (req, res) {
    res.sendfile(staticRoot + '/index.html');
});

// Create our webpack server, this will host our static files
var server = new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    quiet: true,
    contentBase: './client',
    noContentBase: false
});

// Allow webpack to use our app server for things it cant find statically
server.app.use(app);

server.listen(config.port, 'localhost', function (err, result) {
    if (err) { return console.log(err); }
    console.log('Listening at localhost:'+config.port);
});

