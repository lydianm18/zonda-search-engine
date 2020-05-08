import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './Main';
import CardDetails from './CardDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/card-details/:order_id" children={<CardDetails />} />
      </Switch>
    </Router>
  );
}

export default App;