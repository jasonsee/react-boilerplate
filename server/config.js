'use strict';

var port = process.env.NODE_PORT || 5000;
var env = process.env.NODE_ENV || 'development';
var apiUrl = process.env.API_URL ?
    process.env.API_URL + ':' + port : 'http://localhost:' + port;

module.exports = {
    port: port,
    env: env,
    apiUrl: apiUrl
};
