'use strict';

var React = require('react');
var { FluxMixin, StoreWatchMixin } = require('flux');

var SearchForm = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin('CustomerStore')],

    getInitialState: function() {
        return {
            more: false
        };
    },

    getStateFromFlux: function() {
        return this.getFlux().stores.CustomerStore.getState();
    },

    onKeyDown: function(event) {
        if (event.key === 'Enter') {
            this.search();
        }
    },

    search: function() {
        var vals = {
            number: this.refs.number.getDOMNode().value,
            name: this.refs.name.getDOMNode().value
        };

        //console.log(vals);
        this.getFlux().actions.customer.get();
    },

    clear: function() {
        this.refs.number.getDOMNode().value = '';
        this.refs.name.getDOMNode().value = '';
    },

    render: function() {

        return <div className="search-form-container">
            <input
                type="text"
                placeholder="Phone Number"
                ref="number"
                onKeyDown={this.onKeyDown} />

            <input
                type="text"
                placeholder="Customer Name"
                ref="customer-name"
                onKeyDown={this.onKeyDown} />

            <input
                type="text"
                placeholder="Street Address"
                ref="address"
                onKeyDown={this.onKeyDown} />

            <input
                type="text"
                placeholder="City"
                ref="city"
                onKeyDown={this.onKeyDown} />

            <input
                type="text"
                placeholder="State"
                ref="state"
                onKeyDown={this.onKeyDown} />

            <input
                type="text"
                placeholder="Zip Code"
                ref="zip"
                onKeyDown={this.onKeyDown} />

            <input
                type="text"
                placeholder="Account Number"
                ref="act-number"
                onKeyDown={this.onKeyDown} />

            <input
                type="text"
                placeholder="Location Number"
                ref="location-number"
                onKeyDown={this.onKeyDown} />


            <span>{!this.state.more ? 'More Search Tools' : 'Less Search Tools'}</span>


            <button onClick={this.search}>Search</button>
            <button onClick={this.clear}>Clear</button>

            <span className="error">{this.state.error}</span>
        </div>;

    }

});

module.exports = SearchForm;

