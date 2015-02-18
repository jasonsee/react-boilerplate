'use strict';

var Promise = require('bluebird');
var Tuxxor = require('helpers/tuxxor');
var CustomerConstants = require('constants').ActionTypes.customer;
var CustomerAPI = require('apis/customer');


var get = function(search) {
    return CustomerAPI.get(search);
};


var CustomerActions = Tuxxor.createActions({
    get: [CustomerConstants.GET, get]
});


module.exports = CustomerActions;

