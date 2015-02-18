'use strict';

var Promise = require('bluebird');
var request = require('superagent');
var _ = require('ramda');

module.exports = {

    /**
     * login
     *
     * @param {Object} credentials A username / password object to pass to the server
     * @return {Promise(Object)} A promised response
     */
    login: function(credentials) {
        credentials = _.pick(['username', 'password'], credentials);

        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(_.merge(credentials, {
                    firstName: 'Willow',
                    lastName: 'Smith-Tree'
                }));
            }, 0);
        });
    },

    /**
     * logout
     *
     * @return {Promise(Object)} A promised response
     */
    logout: function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 0);
        });
    }

};

