//DEPENDENCIES
import React from 'react';
import { Switch, Route } from "react-router-dom";

//PAGES COMPONENT
import Performance from './components/pages/Performance';
import EmployeesList from './components/pages/EmployeesList';
import Navbar from './components/Navbar';
import Settings from './components/pages/Settings';
import Home from './components/pages/Home';

//GENERAL STYLING 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';




class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="App">
        <Navbar className="col-1"/>
        <div className="container-fluid col" style={{width:"95%", float:"right"}}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/employee-list" component={EmployeesList}></Route>
            <Route exact path="/performance" component={Performance}></Route>
            <Route exact path="/performance" component={Settings}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}


export default App;
