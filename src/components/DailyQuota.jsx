import React from "react";
import Data from "../seed/seeds.json";
var BarChart = require("react-chartjs").Bar;

class DailyQuota extends React.Component {
  state = {
    total: undefined,
    seed: Data,
    data: {
      labels: [
        "Adrian",
        "Marcelly",
        "Julie",
        "Allex",
        "Nissandro",
        "Ronaldinho Gaúcho",
        "Josue"
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3, 4],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgb(30, 40, 20)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgb(30, 40, 20)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
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

  renderTable = () => {
    return this.state.seed.map((eachEmployee, key) => {
      return (
        <tr key={key}>
          <th>{eachEmployee.funcionario}</th>
          {this.renderHourlyTotal(key)}
          <td>{this.calculateTotal(key)}</td>
          <td>Media</td>
        </tr>
      );
    });
  };

  renderHourlyTotal = index => {
    let hours = this.state.seed[index].horas;
    return hours.map((eachHour, key) => {
      index++;
      return <td key={key}>{eachHour}</td>;
    });
  };

  reducer = (total, num) => {
    return total + num;
  };

  calculateTotal = index => {
    let hours = this.state.seed[index].horas;
    let total = hours.reduce(this.reducer);
    return total;
  };

  render() {
    return (
      <div className="daily-quota-tracker">
        <div className="container">
          <table style={{ textAlign: "center" }} className="table">
            <thead>
              <tr>
                <th scope="col">Funcionario</th>
                {this.renderHours()}
                <th>Total:</th>
                <th>Média Hora:</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
              {/* {this.renderHourlyTotal()} */}
            </tbody>
            <tfoot>
              <tr>
                <th>dqw</th>
                <th> kaopsgk</th>
                <th>asd</th>
                <th>{this.state.total}</th>
              </tr>
            </tfoot>
          </table>
          <BarChart
            data={this.state.data}
            options={this.state.options}
            width="600"
            height="250"
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default DailyQuota;
