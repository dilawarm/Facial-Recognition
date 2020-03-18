import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./Component/Homepage/index";
import createIdentity from "./Component/createIdentity/index";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Homepage} />
        <Route path="/createIdentity" exact component={createIdentity} />
      </Router>
    );
  }
}

export default App;
