import React, { Component } from 'react';
import { Battle, List } from './components';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  return (
    <Router>
      <div className="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/battle">
            <Battle />
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
