'use strict';

var port = process.env.NODE_PORT || 9000;

var env = process.env.NODE_ENV || 'development';

var apiUrl = process.env.API_URL ?
    process.env.API_URL + ':' + port : 'http://localhost:' + port;

var monkeypodUrl = 'https://monkeypod.io:443/mpapi/DSServices/CCTR/CallCenter/api';

module.exports = {
    port: port,
    env: env,
    apiUrl: apiUrl,
    monkeypodUrl: monkeypodUrl
};
