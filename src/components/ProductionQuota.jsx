import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import ProductionAverage from "./ProductionAverage.jsx";
import "./styles/ProductionQuota.scss";
import Filters from "./Filters.jsx";
import BarChart from "./BarChart.jsx";

class Quota extends React.Component {
  constructor() {
    super();
    this.totalColAverage = undefined;
    this.averageArrayAverage = undefined;
    this.hourlyAverageMaximum = undefined;
    this.averageDeviationMax = undefined;
    this.averageDeviationMin = undefined;
    this.averageQuota = undefined;
    this.totalQuota = undefined;
    this.teamDailyTotal = undefined;
    this.employeeNames = [];
    this.productionsArray = [];
    this.colDeviationArray = [];
    this.averagesColArray = [];
    this.rowTotalsArray = [];
    this.rowAveragesArray = [];
    this.colTotalsArray = [];
    this.employeeHours = [];

    this.state = {
      quotas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      maximumDeviationRow: [],
      minimumDeviationRow: [],
      totalDeviationMax: undefined,
      totalDeviationMin: undefined,
      data: Data,
      filteredData: Data,
      filters: {
        byName: {
          active: false,
          nameFilter: ""
        }
      }
    };
  }

  renderTable = () => {
    let rows = [];
    if (this.state.filters.byName.nameFilter.length > 0) {
      rows = this.state.filteredData.map((eachEmployee, key) => {
        this.averagesColArray.push(
          Math.round(
            eachEmployee.horas.reduce(this.reducer) / eachEmployee.horas.length
          )
        );
        this.colTotalsArray.push(eachEmployee.horas.reduce(this.reducer));
        return (
          <tr key={key}>
            <th>{eachEmployee.funcionario}</th>
            {this.renderHourlyTotal(eachEmployee)}
          </tr>
        );
      });
      let deviationRow = this.state.filteredData[0].horas.map(
        (eachHour, key) => {
          return <td>{this.renderDeviation(key)}</td>;
        }
      );
      let maximumRow = this.state.filteredData[0].horas.map((eachHour, key) => {
        return <td>{this.renderMax(key)}</td>;
      });
      let minimumRow = this.state.filteredData[0].horas.map((eachHour, key) => {
        return <td>{this.renderMin(key)}</td>;
      });
      rows.push(
        <tr>
          <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>Total:</th>
          {this.renderSums()}
        </tr>,
        <tr>
          <th>Média</th>
          {this.renderTeamAverage()}
        </tr>,
        <tr>
          <th>Desvio</th>
          {deviationRow}
          {this.renderDailyDeviation()}
          <td>{this.renderDailyAverageDeviation()}</td>
        </tr>,
        <tr>
          <th>Máximo:</th>
          {maximumRow}
          <td>{this.renderTotalDeviationMax()}</td>
          <td>{this.renderAverageDeviationMax()}</td>
        </tr>,
        <tr>
          <th>Mínimo:</th>
          {minimumRow}
          <td>{this.renderTotalDeviationMin()}</td>
          <td>{this.renderAverageDeviationMin()}</td>
        </tr>,
        <tr>
          <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>Meta:</th>
          {this.renderQuota()}
          <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>
            {this.getTotalQuota()}
          </th>
          <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>
            {this.getAverageQuota()}
          </th>
        </tr>,
        <tr>
          <th style={{ borderBottom: "0px" }}>% Atingimento:</th>
          {this.renderProduction()}
        </tr>
      );
    } else if (this.state.filters.byName.nameFilter.length === 0) {
      rows = this.state.data.map((eachEmployee, key) => {
        this.employeeHours.push(eachEmployee.horas);
        this.employeeNames.push(eachEmployee.funcionario);
        this.averagesColArray.push(
          Math.round(
            eachEmployee.horas.reduce(this.reducer) / eachEmployee.horas.length
          )
        );
        this.colTotalsArray.push(eachEmployee.horas.reduce(this.reducer));
        return (
          <tr key={key}>
            <th>{eachEmployee.funcionario}</th>
            {this.renderHourlyTotal(eachEmployee)}
          </tr>
        );
      });
      let deviationRow = this.state.data[0].horas.map((eachHour, key) => {
        return <td>{this.renderDeviation(key)}</td>;
      });
      let maximumRow = this.state.data[0].horas.map((eachHour, key) => {
        return <td>{this.renderMax(key)}</td>;
      });
      let minimumRow = this.state.data[0].horas.map((eachHour, key) => {
        return <td>{this.renderMin(key)}</td>;
      });
      rows.push(
        <tr>
          <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>Total:</th>
          {this.renderSums()}
        </tr>,
        <tr>
          <th>Média</th>
          {this.renderTeamAverage()}
        </tr>,
        <tr>
          <th>Desvio</th>
          {deviationRow}
          {this.renderDailyDeviation()}
          <td>{this.renderDailyAverageDeviation()}</td>
        </tr>,
        <tr>
          <th>Máximo:</th>
          {maximumRow}
          <td>{this.renderTotalDeviationMax()}</td>
          <td>{this.renderAverageDeviationMax()}</td>
        </tr>,
        <tr>
          <th>Mínimo:</th>
          {minimumRow}
          <td>{this.renderTotalDeviationMin()}</td>
          <td>{this.renderAverageDeviationMin()}</td>
        </tr>,
        <tr>
          <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>Meta:</th>
          {this.renderQuota()}
          <th
            style={{
              backgroundColor: "rgba(11,11,11,0.1)",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              borderBottom: "1px solid black"
            }}
          >
            {this.getTotalQuota()}
          </th>
          <th
            style={{
              backgroundColor: "rgba(11,11,11,0.1)",
              borderRight: "1px solid black",
              borderLeft: "1px solid black",
              borderBottom: "1px solid black"
            }}
          >
            {this.getAverageQuota()}
          </th>
        </tr>,
        <tr>
          <th style={{ borderBottom: "0px" }}>% Atingimento:</th>
          {this.renderProduction()}
          {this.renderProductionTotal()}
        </tr>
      );
    }

    return rows;
  };

  renderHourlyTotal = eachEmployee => {
    let hours = eachEmployee.horas;
    let total = 0;
    let sums = this.rowTotalsArray;
    let columns = hours.map((eachHour, key) => {
      total += eachHour;
      sums[key] ? (sums[key] += eachHour) : (sums[key] = eachHour);
      if (eachHour > this.state.maximumDeviationRow[key]) {
        return (
          <td key={key} style={{ backgroundColor: "rgba(0,0,255, 0.3)" }}>
            {eachHour}
          </td>
        );
      } else if (eachHour < this.state.minimumDeviationRow[key]) {
        return (
          <td key={key} style={{ backgroundColor: "rgba(255,0,0,0.3)" }}>
            {eachHour}
          </td>
        );
      } else {
        return <td key={key}>{eachHour}</td>;
      }
    });
    if (total > this.state.totalDeviationMax) {
      columns.push(
        <td style={{ backgroundColor: "rgba(0,0,255, 0.3)" }}>
          {Math.round(total)}
        </td>
      );
    } else if (total < this.state.totalDeviationMin) {
      columns.push(
        <td style={{ backgroundColor: "rgba(255,0,0,0.3)" }}>
          {Math.round(total)}
        </td>
      );
    } else {
      columns.push(<td>{Math.round(total)}</td>);
    }
    if (total / hours.length > this.state.averageDeviationMax) {
      columns.push(
        <td style={{ backgroundColor: "rgba(0,0,255, 0.3)" }}>
          {Math.round(total / hours.length)}
        </td>
      );
    } else if (total / hours.length < this.state.averageDeviationMin) {
      columns.push(
        <td style={{ backgroundColor: "rgba(255,0,0,0.3)" }}>
          {Math.round(total / hours.length)}
        </td>
      );
    } else {
      columns.push(<td>{Math.round(total / hours.length)}</td>);
    }
    return columns;
  };

  renderSums = () => {
    let teamDailyTotal = 0;
    let teamTotalRow = this.rowTotalsArray.map((eachSum, key) => {
      teamDailyTotal += eachSum;
      return (
        <th
          style={{
            backgroundColor: "rgba(11,11,11,0.1)",
            borderRight: "1px solid black",
            borderLeft: "1px solid black",
            borderBottom: "1px solid black"
          }}
          key={key}
        >
          {eachSum}
        </th>
      );
    });
    this.teamDailyTotal = teamDailyTotal;
    teamTotalRow.push(
      <th
        style={{
          backgroundColor: "rgba(11,11,11,0.1)",
          borderRight: "1px solid black",
          borderBottom: "1px solid black"
        }}
      >
        {Math.round(teamDailyTotal)}
      </th>,
      <th
        style={{
          backgroundColor: "rgba(11,11,11,0.1)",
          borderRight: "1px solid black",
          borderBottom: "1px solid black"
        }}
      >
        {Math.round(teamDailyTotal / this.rowTotalsArray.length)}
      </th>
    );
    return teamTotalRow;
  };

  renderTeamAverage = () => {
    let teamDailyTotal = 0;
    let averages = this.rowTotalsArray.map((eachSum, key) => {
      teamDailyTotal += eachSum;
      return <td>{Math.round(eachSum / this.state.filteredData.length)}</td>;
    });
    let teamDailyAverage = teamDailyTotal / this.state.filteredData.length;
    this.totalColAverage = teamDailyAverage;
    this.averageArrayAverage = Math.round(
      teamDailyAverage / this.rowTotalsArray.length
    );
    averages.push(
      <td>{Math.round(teamDailyAverage)}</td>,
      <td>{Math.round(teamDailyAverage / this.rowTotalsArray.length)}</td>
    );
    return averages;
  };

  renderDeviation = index => {
    let teamTotal = [];
    let specificHour = index;
    for (let x = 0; x < this.state.filteredData.length; x++) {
      teamTotal.push(this.state.filteredData[x].horas[specificHour]);
    }
    const n = teamTotal.length;
    const mean = teamTotal.reduce((a, b) => a + b) / n;
    const s = Math.sqrt(
      teamTotal.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );
    this.colDeviationArray.push(Math.round(s));
    return Math.round(s);
  };

  renderDailyDeviation = () => {
    const n = this.rowTotalsArray.length;
    const mean = this.rowTotalsArray.reduce((a, b) => a + b) / n;
    const s = Math.sqrt(
      this.rowTotalsArray
        .map(x => Math.pow(x - mean, 2))
        .reduce((a, b) => a + b) / n
    );
    this.totalDeviation = Math.round(s);
    return <td>{Math.round(s)}</td>;
  };

  renderDailyAverageDeviation = () => {
    const n = this.averagesColArray.length;
    const mean = this.averagesColArray.reduce((a, b) => a + b) / n;
    const s = Math.sqrt(
      this.averagesColArray
        .map(x => Math.pow(x - mean, 2))
        .reduce((a, b) => a + b) / n
    );
    this.averageDeviation = Math.round(s);

    return Math.round(s);
  };

  reducer = (total, num) => {
    return total + num;
  };

  renderMax = index => {
    let teamTotal = this.rowTotalsArray[index];
    this.rowAveragesArray.push(
      Math.round(teamTotal / this.state.filteredData.length)
    );
    return Math.round(
      this.colDeviationArray[index] + this.rowAveragesArray[index]
    );
  };

  getState = () => {
    this.setState({
      totalDeviationMax: this.totalDeviationMax,
      totalDeviationMin: this.totalDeviationMin,
      averageDeviationMax: this.averageDeviationMax,
      averageDeviationMin: this.averageDeviationMin,
      totalQuota: this.totalQuota,
      averageQuota: this.averageQuota
    });
  };

  renderTotalDeviationMax = () => {
    let max = this.totalDeviation + this.rowAveragesArray.reduce(this.reducer);
    this.totalDeviationMax = max;
    return max;
  };

  renderAverageDeviationMax = () => {
    let averageDeviationMax = this.averageArrayAverage + this.averageDeviation;
    this.averageDeviationMax = averageDeviationMax;
    return averageDeviationMax;
  };

  renderTotalDeviationMin = () => {
    let min = this.rowAveragesArray.reduce(this.reducer) - this.totalDeviation;
    this.totalDeviationMin = min;
    // this.setState({ totalDeviationMin: min });
    return min;
  };

  renderAverageDeviationMin = () => {
    let averageDeviationMin = this.averageArrayAverage - this.averageDeviation;
    this.averageDeviationMin = averageDeviationMin;
    return averageDeviationMin;
  };

  renderMin = index => {
    return Math.round(
      this.rowAveragesArray[index] - this.colDeviationArray[index]
    );
  };

  renderHours = () => {
    let index = 0;
    let hours = this.state.filteredData[index].horas;
    return hours.map((eachHour, key) => {
      index++;
      return (
        <th
          key={key}
          style={{
            backgroundColor: "#007ACC",
            color: "white",
            borderTop: "1px solid black"
          }}
        >
          {key + 7}h-{key + 8}h{" "}
        </th>
      );
    });
  };

  newEmployeeRow = () => {
    if (this.state.isCreating) {
      let newEmployee = this.state.funcionario;
      let total = 0;
      if (newEmployee.nome.length > 0) {
        return (
          <tr
            style={{
              backgroundColor: "rgba(33,33,33, 0.1)",
              boxShadow: "2px 2px 2px 2px black"
            }}
          >
            <th>{newEmployee.nome}</th>
            {newEmployee.horas.map((eachHour, key) => {
              total += eachHour;
              return this.editableCell(eachHour, key);
            })}
            <td>{total}</td>
            <td>{total / newEmployee.horas.length}</td>
          </tr>
        );
      } else
        return (
          <tr style={{ backgroundColor: "rgba(33,33,33, 0.1)" }}>
            <th>Nome</th>
            {newEmployee.horas.map((eachHour, key) => {
              total += eachHour;
              return this.editableCell(eachHour, key);
            })}
            <td>{total}</td>
            <td>{total / newEmployee.horas.length}</td>
          </tr>
        );
    }
  };

  editableCell = (tableCellContent, key) => {
    return (
      <td key={key} onClick={this.editCell}>
        <p>{tableCellContent}</p>
        <input
          style={{ width: "60%", display: "inline", height: "20px" }}
          type="text"
          onChange={e => this.editCell(e, key)}
          value={this.state.funcionario.horas[key]}
        ></input>
      </td>
    );
  };

  editCell = (e, index) => {
    let newArray = this.state.funcionario.horas;
    newArray[index] = e.target.value;
    this.setState({
      funcionario: {
        nome: this.state.funcionario.nome,
        setor: this.state.funcionario.setor,
        tipo: this.state.funcionario.tipo,
        horas: newArray,
        metaDiaria: this.state.funcionario.metaDiaria,
        totalDiario: this.state.funcionario.totalDiario
      }
    });
  };

  nameHandler = event => {
    this.setState({
      filters: {
        byName: {
          active: this.state.filters.byName.active,
          nameFilter: event.target.value
        }
      }
    });
    let filteredData = [];
    this.state.data.map(eachEmployee => {
      if (eachEmployee.funcionario.includes(event.target.value)) {
        filteredData.push(eachEmployee);
      } else if (eachEmployee.setor.includes(event.target.value)) {
        filteredData.push(eachEmployee);
      }
    });
    if (filteredData.length > 0) {
      this.setState({
        filteredData: filteredData
      });
    } else if (filteredData.length === 0) {
      this.setState({
        filteredData: this.state.data
      });
    }
  };

  setHourlyQuota = (index, e) => {
    let array = this.state.quotas;
    array[index] = parseInt(e.target.value);
    this.setState({
      quotas: array
    });
  };

  renderQuota = () => {
    return this.state.quotas.map((eachQuota, index) => {
      return (
        <td
          style={{
            backgroundColor: "rgba(11,11,11,0.1)",
            borderRight: "1px solid black",
            borderLeft: "1px solid black",
            borderBottom: "1px solid black"
          }}
        >
          {" "}
          <input
            key={index}
            type="number"
            style={{
              width: "85%",
              padding: "5px 2px",
              height: "25px"
            }}
            onChange={e => this.setHourlyQuota(index, e)}
            value={this.state.quotas[index]}
          />
        </td>
      );
    });
  };

  getTotalQuota = () => {
    this.totalQuota = this.state.quotas.reduce(this.reducer);
    return this.totalQuota;
  };

  getAverageQuota = () => {
    this.totalQuota = this.state.quotas.reduce(this.reducer);
    let averageQuota = this.totalQuota / 10;
    return averageQuota;
  };

  renderProduction = () => {
    return this.state.quotas.map((eachQuota, index) => {
      if (eachQuota === isNaN) {
        eachQuota = 0;
      }
      let total = this.rowTotalsArray[index];
      let percentage = (total / eachQuota) * 100;
      let production = Math.round(percentage * 10) / 10;
      this.productionsArray.push(production);
      if (eachQuota !== 0) {
        if (percentage >= 100) {
          return (
            <td style={{ backgroundColor: "rgba(0,0,255, 0.3)" }}>
              {production}%
            </td>
          );
        } else if (percentage <= 100) {
          return (
            <td style={{ backgroundColor: "rgba(255,0,0, 0.3)" }}>
              {production}%
            </td>
          );
        } else if (eachQuota === 0) {
          return <td>Sem meta</td>;
        }
      } else {
        return <td>N/D</td>;
      }
    });
  };

  renderProductionTotal = () => {
    let total = this.teamDailyTotal;
    let quotasTotal = this.state.quotas.reduce(this.reducer);
    let percentage = (total / quotasTotal) * 100;
    let totalProductionPercentage = Math.round(percentage * 10) / 10;
    if (totalProductionPercentage === Infinity) {
      return <td style={{ whiteSpace: "nowrap" }}>% Total:</td>;
    } else {
      if (totalProductionPercentage >= 100) {
        return (
          <td style={{ backgroundColor: "rgba(0,0,255,0.3)" }}>
            {totalProductionPercentage}%
          </td>
        );
      } else if (totalProductionPercentage <= 100) {
        return (
          <td style={{ backgroundColor: "rgba(255,0,0,0.3)" }}>
            {totalProductionPercentage}%
          </td>
        );
      }
    }
  };
  componentDidMount = () => {
    this.getState();
    let deviationsArray = this.state.filteredData[0].horas.map(
      (eachHour, key) => {
        return this.renderDeviation(key);
      }
    );

    let maximumDeviationRow = this.state.filteredData[0].horas.map(
      (eachHour, key) => {
        return this.renderMax(key);
      }
    );
    let minimumDeviationRow = this.state.filteredData[0].horas.map(
      (eachHour, key) => {
        return this.renderMin(key);
      }
    );

    this.setState({
      deviationsArray: deviationsArray,
      maximumDeviationRow: maximumDeviationRow,
      minimumDeviationRow: minimumDeviationRow
    });
  };

  render() {
    this.teamDailyTotal = undefined;
    this.totalColAverage = undefined;
    this.averageArrayAverage = undefined;
    this.hourlyAverageMaximum = undefined;
    this.averageQuota = undefined;
    this.totalQuota = undefined;
    this.employeeNames = [];
    this.colDeviationArray = [];
    this.averagesColArray = [];
    this.rowTotalsArray = [];
    this.productionsArray = [];
    this.rowAveragesArray = [];
    this.colTotalsArray = [];
    this.employeeHours = [];
    return (
      <div className="daily-quota-tracker">
        <div className="container-fluid">
          <div className="row">
            <div className="col-7">
              <Filters
                nameHandler={this.nameHandler}
                employeeName={this.state.filters.byName.nameFilter}
              />
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <ProductionTotal total={this.rowTotalsArray} />
                </div>
                <div className="col">
                  <ProductionAverage total={this.rowTotalsArray} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <table style={{ textAlign: "center" }} className="my-table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "#007ACC",
                        color: "white",
                        borderTop: "1px solid black",
                        borderLeft: "1px solid black"
                      }}
                    >
                      Funcionario
                    </th>
                    {this.renderHours()}
                    <th
                      style={{
                        backgroundColor: "#007ACC",
                        color: "white",
                        borderTop: "1px solid black"
                      }}
                    >
                      Total:
                    </th>
                    <th
                      style={{
                        backgroundColor: "#007ACC",
                        color: "white",
                        borderTop: "1px solid black",
                        borderRight: "1px solid black"
                      }}
                    >
                      Média Hora:
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderTable()}</tbody>
              </table>
            </div>
            <div className="col">
              <BarChart name={this.employeeNames} total={this.colTotalsArray} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quota;
