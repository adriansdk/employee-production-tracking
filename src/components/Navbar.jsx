import React from "react";
import { Link } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

class Navbar extends React.Component {
  state = {
    someKey: ""
  };

  render() {
    return (
      <div className="navbar-container">
        <SideNav
          onSelect={selected => {
            // Add your code here
          }}
          style={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            backgroundColor: "black"
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <Link to="/">
                  <i
                    className="fa fa-fw fa-home"
                    style={{ fontSize: "1.75em", margin: "15px auto" }}
                  />
                </Link>
              </NavIcon>
              <NavText style={{ fontSize: "20px" }}>Home</NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <Link className="nav-link" to="/performance">
                  <i
                    className="fa fa-fw fa-line-chart"
                    style={{ fontSize: "1.75em" }}
                  />
                </Link>
              </NavIcon>
              <NavText style={{ fontSize: "20px" }}>Charts</NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>Line Chart</NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>Bar Chart</NavText>
              </NavItem>
            </NavItem>
            <NavItem eventKey="settings">
              <NavIcon>
                <Link to="/settings">
                  <i
                    className="fa fa-fw fa-cog"
                    style={{ fontSize: "1.75em", margin: "15px auto" }}
                  />
                </Link>
              </NavIcon>
              <NavText style={{ fontSize: "20px" }}>Settings</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default Navbar;
