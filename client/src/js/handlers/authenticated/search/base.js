'use strict';

var React = require('react');
var { RouteHandler } = require('react-router');
var { FluxMixin, StoreWatchMixin } = require('flux');

var Search = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin('CustomerStore')],

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

        return <div className="search-container">
            <div className="sidebar-container">
                <h2>Search for Customer</h2>

                <input
                    type="text"
                    placeholder="Name"
                    ref="name"
                    onKeyDown={this.onKeyDown} />

                <input
                    type="text"
                    placeholder="Phone Number"
                    ref="number"
                    onKeyDown={this.onKeyDown} />

                <button onClick={this.search}>Search</button>
                <button onClick={this.clear}>Clear</button>

                <span className="error">{this.state.error}</span>
            </div>

            <div className="detail-container">
                <p>Results</p>

                <input
                    type="text"
                    placeholder="Filter"
                    ref="filter" />

                <ul>
                    {this.state.customers.map(function(customer, i) {
                        return <li key="i">{`customer.firstName customer.lastName`}</li>;
                    })}
                </ul>

            </div>
        </div>;

    }

});

module.exports = Search;

