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
    return this.state.seed.map((eachEmployee, key) => {
      return (
        <th scope="row">
          {key + 7}h-{key + 8}h{" "}
        </th>
      );
    });
  };

  renderTable = () => {
    return this.state.seed.map((eachEmployee, key) => {
      return (
        <tr key={key}>
          <th scope="row">
            {key + 7}h-{key + 8}h{" "}
          </th>
          <td>{eachEmployee.funcionario}</td>
          <td>{eachEmployee.horas.oito}</td>
          <td>{eachEmployee.metaDiaria}</td>
          <td>{eachEmployee.setor}</td>
        </tr>
      );
    });
  };

  calculateTotal = () => {
    return this.state.seed.map(eachEmployee => {
      for (var i = 0; i < eachEmployee.horas.length; i++) {
        let num1 = eachEmployee;
        let num2 = eachEmployee;
      }
    });
  };

  render() {
    return (
      <div className="daily-quota-tracker">
        <div className="container">
          <table style={{ textAlign: "center" }} className="table">
            <thead>
              <th scope="col">Funcionario</th>
              <th scope="col"></th>
            </thead>
            {this.renderTable()}
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>{this.state.total}</td>
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
