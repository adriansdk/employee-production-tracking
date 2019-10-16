import React from "react";
import data from "../seed/seeds.json";

class TestingComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: data,
      allEmployeeHours: [],
      individualDailyAverage: [],
      individualDailyTotal: [],
      teamDailyTotal: [],
      teamDailyAverage: []
    };
  }

  reducer = (total, num) => {
    return total + num;
  };

  getHours = () => {
    let allEmployeeNames = [];
    let allEmployeeHours = [];
    let individualDailyAverage = [];
    let individualDailyTotal = [];
    let teamDailyTotal = [];
    let teamDailyAverage = [];
    this.state.data.map((eachEmployee, key) => {
      allEmployeeHours.push(eachEmployee.horas);
      allEmployeeNames.push(eachEmployee.funcionario);
    });
    let timeTeamHours = [];
    allEmployeeHours.map((eachHour, i) => {
      eachHour.map((productivity, index) => {
        console.log(productivity);
        timeTeamHours.push((timeTeamHours[index] = productivity));
      });
      individualDailyTotal.push(Math.round(eachHour.reduce(this.reducer)));
      individualDailyAverage.push(
        Math.round(eachHour.reduce(this.reducer) / eachHour.length)
      );
    });
    console.log(timeTeamHours);
  };

  render() {
    return (
      <div>
        <h1>hello</h1>
        {this.getHours()}
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default TestingComponent;
