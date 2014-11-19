'use strict';

var CounterActions = require('actions').CounterActions;
var CounterStore = require('stores').CounterStore;

var ClickCounter = React.createClass({
    
    getInitialState: function() {
        return {
            count: CounterStore.getCount()
        };
    },

    componentDidMount: function() {
        CounterStore.addChangeListener(this._onChange); 
    },
    
    componentWillUnmount: function() {
        CounterStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            count: CounterStore.getCount()
        });
    },

    increment: function() {
        CounterActions.increment();
    },

    render: function() {
        return (
            <div> 
                <h2>Click Counter Example</h2>
                <button onClick={this.increment}>Click Me</button>
                <p>{this.state.count}</p>
            </div>      
        );
    }
});

module.exports = ClickCounter;
