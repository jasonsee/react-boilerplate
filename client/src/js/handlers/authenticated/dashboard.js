'use strict';

var React = require('react');
var { FluxMixin } = require('flux');

var Dashboard = React.createClass({

    mixins: [FluxMixin],

    render: function() {
        return <div>
            <h1> Dashboard Handler </h1>
        </div>;
    }

});

module.exports = Dashboard;



