import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import "./styles/Quota.scss";
import NewEmployee from "./NewEmployee.jsx";

class Quota extends React.Component {
  constructor() {
    super();
    this.sums = [];
    this.state = { seed: Data };
  }

  renderTable = () => {
    let rows = this.state.seed.map((eachEmployee, key) => {
      return (
        <tr key={key}>
          <th>{eachEmployee.funcionario}</th>
          {this.renderHourlyTotal(eachEmployee)}
        </tr>
      );
    });

    rows.push(
      <tr>
        <th>Total:</th>
        {this.showSums()}
      </tr>
    );
    return rows;
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

  showSums = () => {
    let teamDailyTotal = 0;
    let lastRow = this.sums.map(eachSum => {
      teamDailyTotal += eachSum;
      return <td>{eachSum}</td>;
    });
    lastRow.push(
      <th>{teamDailyTotal}</th>,
      <th>{teamDailyTotal / this.sums.length}</th>
    );
    return lastRow;
  };

  renderHourlyTotal = eachEmployee => {
    let hours = eachEmployee.horas;
    let total = 0;
    let sums = this.sums;
    let columns = hours.map((eachHour, key) => {
      total += eachHour;
      sums[key] ? (sums[key] += eachHour) : (sums[key] = eachHour);
      return <td key={key}>{eachHour}</td>;
    });
    columns.push(<td>{total}</td>, <td>{total / hours.length}</td>);
    return columns;
  };

  render() {
    this.sums = [];
    return (
      <div className="daily-quota-tracker">
        <div className="container">
          <div className="row">
            <div className="col-10">
              <table style={{ textAlign: "center" }} className="table">
                <thead>
                  <tr>
                    <th scope="col">Funcionario</th>
                    {this.renderHours()}
                    <th>Total:</th>
                    <th>Média Hora:</th>
                  </tr>
                </thead>
                <tbody>{this.renderTable()}</tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
            </div>
            <div className="col">
              <div className="row">
                <ProductionTotal total={this.sums} />
              </div>
              <div className="row">
                <NewEmployee/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quota;
