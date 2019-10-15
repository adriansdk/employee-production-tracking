import React from "react";
import Data from "../seed/seeds.json";

class AAAA extends React.Component {
  constructor() {
    super();
    this.state = {
      seed: Data,
      employeeHours: []
    };
  }

  renderTable = () => {
    return this.state.seed.map(eachEmployee => {
      return (
        <tr>
          <th>{eachEmployee.funcionario}</th>
          {this.renderEmployeeHours(eachEmployee)}
        </tr>
      );
    });
  };

  renderEmployeeHours = eachEmployee => {
    return eachEmployee.horas.map(eachHour => {
      return <td>{eachHour}</td>;
    });
  };

  componentDidMount() {
    let employeeHours = this.state.seed.map((eachEmployee, key) => {
      return eachEmployee.horas;
    });

    this.setState({
      employeeHours: employeeHours
    });
  }

  render() {
    return <table>{this.renderTable()}</table>;
  }
}

export default AAAA;
