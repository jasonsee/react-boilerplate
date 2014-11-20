'use strict';

jest.dontMock('../counter');
jest.dontMock('object-assign');

describe('CounterStore', function() {

    var AppConstants = require('../../constants/appConstants'),
        ActionTypes = AppConstants.ActionTypes;

    var actionIncrement = {
        type: ActionTypes.COUNTER_INCREMENT_COUNT,
        quantity: 1
    };

    var AppDispatcher;
    var CounterStore;
    var callback;

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/appDispatcher');
        CounterStore = require('../counter');
        callback = AppDispatcher.register.mock.calls;
    });

    it('should initialize with a count of 0', function() {
        expect(CounterStore.getCount()).toEqual(0);
    });
});
