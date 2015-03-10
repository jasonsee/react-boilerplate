'use strict';

var React = require('react');
var { RouteHandler } = require('react-router');

var Unauthenticated = React.createClass({

    render: function() {
        return <div className="unauthenticated-container">
            <RouteHandler />
        </div>;
    }

});

module.exports = Unauthenticated;



