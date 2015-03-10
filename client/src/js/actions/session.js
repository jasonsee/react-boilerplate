'use strict';

var {promised, auto} = require('tuxxor');
var SessionAPI = require('apis/session');

var login = function(credentials) {
    return SessionAPI.login(credentials);
};

var logout = function() {
    return SessionAPI.logout();
};

var SessionActions = {
    login: promised("SESSION_LOGIN", login),
    logout: auto("SESSION_LOGOUT")
};

module.exports = SessionActions;




