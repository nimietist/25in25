import React from 'react';
import { Route, Link } from 'react-router';

var App = React.createClass({
  render: function(){
    return <div>
      <Link to='/hello'>Hello</Link>
      {this.props.children}
    </div>;
  }
});

export default (
  <Route path="/" component={App} >
    <Route path="hello" component={require('./hello')} />
    <Route path="404" component={require('./404')} />
  </Route>
);
