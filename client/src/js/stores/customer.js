'use strict';

var _ = require('ramda');
var Tuxxor = require('helpers/tuxxor');

var CustomerConstants = require('constants').ActionTypes.customer;

var CustomerStore = Tuxxor.createStore({

    initialize: function() {
        this.customers = [];
    },

    actions: {
        setCustomers: CustomerConstants.GET_SUCCESS
    },

    setCustomers: function($__0 ) {var customers=$__0[0],dispatchId=$__0[1];
        this.customers = customers;
        this.emit('change');
    },

    getState: function() {
        return _.clone({
            customers: this.customers
        });
    }

});


module.exports = new CustomerStore();
