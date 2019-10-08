import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Performance from './components/pages/Performance';
import EmployeesList from './components/pages/EmployeesList';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/employee-list" component={EmployeesList}></Route>
          <Route exact path="/performance" component={Performance}></Route>
        </Switch>
      </div>
    );
  }
}


export default App;
