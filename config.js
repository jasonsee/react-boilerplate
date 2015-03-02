'use strict';


// REAPLACE ME
// =============================================================================
var apiFallback = '';
var portFallback = 9000;
var monkeypodFallback = '';
// =============================================================================

var env = process.env.NODE_ENV || 'development';
var port = process.env.NODE_PORT || portFallback;
var monkeypodUrl = 'https://monkeypod.io:443/mpapi/' + monkeypodFallback;

var apiUrl = process.env.API_URL ?
    process.env.API_URL + ':' + port : apiFallback;

module.exports = {
    port: port,
    env: env,
    apiUrl: apiUrl,
    monkeypodUrl: monkeypodUrl
};
