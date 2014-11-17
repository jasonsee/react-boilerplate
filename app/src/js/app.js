'use strict';

window.React = require('react');

var App = React.createClass({
    
    render: function() {
        return (
            <h1>WAT React Boilerplate</h1>       
        ); 
    }
});

React.render(<App />, document.getElementById('app-wrapper'));
