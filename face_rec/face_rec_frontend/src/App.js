import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./Component/Homepage/index";
import createIdentity from "./Component/createIdentity/index";
import findIdentity from "./Component/findIdentity/index";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Homepage} />
        <Route path="/createidentity" exact component={createIdentity} />
        <Route path="/findidentity" exact component={findIdentity} />
      </Router>
    );
  }
}

export default App;
