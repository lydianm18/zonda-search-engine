import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Main from './Main';
import CardDetails from './CardDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/CardDetails" children={<CardDetails />} />
      </Switch>
    </Router>
  );
}

export default App;