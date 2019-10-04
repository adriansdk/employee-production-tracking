import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import EmployeesList from './components/EmployeesList';
import Navbar from './components/Navbar';

class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">ayy</Route>
          <Route exact path="/whatever">ayy2</Route>
        </Switch>
      </div>
    );
  }
}


export default App;
