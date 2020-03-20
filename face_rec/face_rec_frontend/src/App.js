import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { HashRouter, Route } from "react-router-dom";

import Homepage from "./Component/Homepage/index";
import createIdentity from "./Component/createIdentity/index";
import findIdentity from "./Component/findIdentity/index";
import Alert from './widgets';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Alert/>
          <Route path="/" exact component={Homepage} />
          <Route path="/createidentity" exact component={createIdentity} />
          <Route path="/findidentity" exact component={findIdentity} />
        </div>
    </HashRouter>
    );
  }
}

export default App;
