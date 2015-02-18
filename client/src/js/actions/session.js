'use strict';

var AppConstants = require('constants');
var ActionTypes = AppConstants.ActionTypes;
var Tuxxor = require('helpers/tuxxor');
var Promise = require('bluebird');
var SessionAPI = require('apis/session');


var login = function(credentials) {
    return SessionAPI.login(credentials);
};

var logout = function() {
    return SessionAPI.logout();
};


var SessionActions = Tuxxor.createActions({
    login: [ActionTypes.session.LOGIN, login],
    logout: [ActionTypes.session.LOGOUT, logout]
});

module.exports = SessionActions;




