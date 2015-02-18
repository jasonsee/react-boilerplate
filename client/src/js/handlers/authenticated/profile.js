'use strict';

var React = require('react');
var { FluxMixin, StoreWatchMixin } = require('flux');

var Dashboard = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin('UserStore')],

    getStateFromFlux: function() {
        return this.getFlux().stores.UserStore.getState();
    },

    render: function() {
        return <div>
            <h1> Profile Handler </h1>

            <pre>
                {JSON.stringify(this.state.user)}
            </pre>
        </div>;
    }

});

module.exports = Dashboard;



