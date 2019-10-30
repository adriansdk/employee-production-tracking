import React from "react";
import Data from "../seed/seeds.json";

class DailyQuota extends React.Component {
  state = {
    data: Data,
    employeeNamesArray: []
  };

  getEmployeeNames = () => {
    let employeeNamesArray = this.state.data.map(eachEmployee => {
      return eachEmployee.funcionario;
    });
    this.setState({ employeeNamesArray });
  };

  getEmployeePecaHours = () => {
    let horaPeca = [];
    let employeeIndividualHours = this.state.data.map(eachEmployee => {
      for (let i = 0; i < eachEmployee.setor.length; i++) {
        horaPeca.push(eachEmployee.setor[i].horaPeca);
      }
    });
    console.log(horaPeca);
  };

  componentDidMount = () => {
    this.getEmployeeNames();
    this.getEmployeePecaHours();
  };

  render() {
    return (
      <div className="daily-quota-tracker">
        <h1>{this.state.employeeNamesArray}</h1>
      </div>
    );
  }
}

export default DailyQuota;
