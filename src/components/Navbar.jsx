import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    someKey: "",
  };

  render() {
    return (
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <Link className="nav-link" to="/performance">
                <li className="nav-item active"> Performance </li>
              </Link>
              <Link className="nav-link" to="/employee-list">
                <li className="nav-item">Employee List</li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default Navbar;
