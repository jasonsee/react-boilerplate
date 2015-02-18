'use strict';

var Promise = require('bluebird');
var request = require('superagent');

module.exports = {

    get: function(search) {
        return new Promise(function(resolve, reject) {
            resolve([]);
            //request.get('/monkeypod/customerssearch', function(res) {
                //resolve(res.body);
            //});
        });
    }

};

