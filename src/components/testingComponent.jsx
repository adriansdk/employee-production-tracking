import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import "./styles/Quota.scss";
import NewEmployee from "./NewEmployee.jsx";
import ProductionAverage from "./ProductionAverage.jsx";

class Quota extends React.Component {
  constructor() {
    super();
    this.state = {
      averageDeviationMin: [],
      averageDeviationMax: [],
      hourlyAverageMaximum: [],

      maximumDeviationRow: [],
      minimumDeviationRow: [],

      totalDeviationMax: [],
      totalDeviationMin: [],

      allData: [],
      seed: Data
    };
  }

  reducer = (total, num) => {
    return total + num;
  };

  getEmployeeHours = () => {
    let allEmployeeHours = [];
    let individualDailyAverage = [];
    let individualDailyTotal = [];
    let teamDailyTotal = []
    let teamDailyAverage = []
    this.state.seed.map((eachEmployee, key) => {
      allEmployeeHours.push(eachEmployee.horas);

      individualDailyTotal.push(
        Math.round(eachEmployee.horas.reduce(this.reducer))
      );

      individualDailyAverage.push(
        Math.round(
          eachEmployee.horas.reduce(this.reducer) / eachEmployee.horas.length
        )
      );
    });
    allEmployeeHours.map(eachHour => {
      console.log(eachHour);
    });
  };

  renderHours = () => {
    let index = 0;
    let hours = this.state.seed[index].horas;
    return hours.map((eachHour, key) => {
      index++;
      return (
        <th key={key}>
          {key + 7}h-{key + 8}h{" "}
        </th>
      );
    });
  };

  componentDidMount = () => {};

  render() {
    this.getEmployeeHours();
    return (
      <div className="daily-quota-tracker">
        <div className="container-fluid">
          <div className="row">
            <div className="col-9">
              <div className="row"></div>
              <table style={{ textAlign: "center" }} className="table">
                <thead>
                  <tr>
                    <th scope="col">Funcionario</th>
                    {this.renderHours()}
                    <th>Total:</th>
                    <th>Média Hora:</th>
                  </tr>
                </thead>
                {/* <tbody>{this.renderTable()}</tbody> */}
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  {/* <ProductionTotal total={this.rowTotalsArray} /> */}
                </div>
                <div className="col">
                  {/* <ProductionAverage total={this.rowTotalsArray} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quota;
