import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:lang" component={SubApp} />
        <Redirect from="/" to="/en" />
      </Switch>
    </Router>
  );
}

function SubApp({ match: { path } }) {
  return (
    <Switch>
      <Route path={`${path}/:route`} component={RouteApp} />
      <Redirect from="/" to="/en/route-1" />
    </Switch>
  );
}

function RouteApp({ match: { url, params: { lang, route } } }) {
  return (
    <div>
      <h2>{lang} - {route}</h2>
      <ul>
        <li><Link to={`/${lang}/route-1`}>Route 1</Link></li>
        <li><Link to={`/${lang}/route-2`}>Route 2</Link></li>
        <li><Link to={`/${lang}/`}>Root</Link></li>
      </ul>
    </div>
  );
}

export default App;
