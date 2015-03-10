'use strict';

var Promise = require('bluebird');
var {promised} = require('tuxxor');
var UserAPI = require('apis/user');


var get = function(credentials) {
    return UserAPI.get(0);
};


var UserActions = {
    get: promised('USER_GET', get)
};


module.exports = UserActions;

