import React from 'react';
import { Link } from 'react-router';

var Hello = React.createClass({
  printer: function() {
    this.setState({'name': `john${this.state.count}`, count: this.state.count + 1});
  },
  getInitialState: function(){
    return {
      name: 'john',
      count: 0
    };
  },
  render: function() {
    return <div id='h' onClick={this.printer}>
      hello {this.state.name} <Link to="/404">404</Link>
    </div>;
  }
});

export default Hello;
