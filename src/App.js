import React from 'react';
import { Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { createHistory } from './history';

const history = createHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/:lang(\w{2})" component={SubApp} />
        <Redirect from="/" to="/en" />
      </Switch>
    </Router>
  );
}

function SubApp({ match: { url }, location: { pathname, ...location } }) {
  return (
    <Switch location={{ ...location, pathname: pathname.slice(url.length) }}>
      <Route path={`/:route`} component={RouteApp} />
      <Redirect from="/" to="/route-1" />
    </Switch>
  );
}

function RouteApp({ match: { params: { route } } }) {
  return (
    <div>
      <h2>? - {route}</h2>
      <ul>
        <li><Link to={`/route-1`}>Route 1</Link></li>
        <li><Link to={`/route-2`}>Route 2</Link></li>
        <li><Link to={`/`}>Root</Link></li>
      </ul>
    </div>
  );
}

export default App;
