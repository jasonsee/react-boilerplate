'use strict';

var Promise = require('bluebird');
var Tuxxor = require('helpers/tuxxor');
var UserConstants = require('constants').ActionTypes.user;
var UserAPI = require('apis/user');


var get = function(credentials) {
    return UserAPI.get(0);
};


var UserActions = Tuxxor.createActions({
    get: [UserConstants.GET, get]
});


module.exports = UserActions;

