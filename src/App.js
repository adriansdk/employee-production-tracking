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
//do i see this???

class App extends React.Component {
  state = {
    containerWidth: "95%",
    activated: false,
  }

  setContainerWidth = () => {
    if(!this.state.activated){
      this.setState({
        containerWidth: "85%", activated: !this.state.activated
      })
    }
    if(this.state.activated){
      this.setState({
        containerWidth: "95%", activated: !this.state.activated
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar className="col-1" width={this.setContainerWidth}/>
        <div className="container-fluid col" style={{ width: this.state.containerWidth, float: "right" }}>
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
