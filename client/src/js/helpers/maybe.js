'use strict';

var _ = require('ramda');

module.exports = function(pred, value) {
    if (_.is(Function, pred)) {
        return false;
    }
};
