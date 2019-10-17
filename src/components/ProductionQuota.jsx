import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import NewEmployee from "./NewEmployee.jsx";
import ProductionAverage from "./ProductionAverage.jsx";
import "./styles/Quota.scss";
import Filters from "./Filters.jsx";

class Quota extends React.Component {
  constructor() {
    super();
    this.totalColAverage = undefined;
    this.averageArrayAverage = undefined;
    this.hourlyAverageMaximum = undefined;
    this.averageDeviationMax = undefined;
    this.averageDeviationMin = undefined;
    this.colDeviationArray = [];
    this.averagesColArray = [];
    this.rowTotalsArray = [];
    this.rowAveragesArray = [];
    this.colTotalsArray = [];
    this.employeeHours = [];

    this.state = {
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
        },
        byDate: false,
        bySector: false,
        byType: false,
        byCategory: false
      },

      isCreating: false,
      funcionario: {
        nome: "",
        setor: "",
        tipo: "",
        horas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        metaDiaria: 0,
        totalDiario: 0
      }
    };
  }

  filterData = () => {};

  renderTable = () => {
    let rows = [];
    if (this.state.filters.byName.nameFilter.length > 0) {
      rows = this.state.filteredData.map((eachEmployee, key) => {
        this.employeeHours.push(eachEmployee.horas);
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
          <td></td>
        </tr>
      );
    } else if (this.state.filters.byName.nameFilter.length === 0) {
      rows = this.state.data.map((eachEmployee, key) => {
        this.employeeHours.push(eachEmployee.horas);
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
          <td></td>
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
        <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }} key={key}>
          {eachSum}
        </th>
      );
    });
    teamTotalRow.push(
      <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>
        {Math.round(teamDailyTotal)}
      </th>,
      <th style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>
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

  getAverageAndTotalDeviation = () => {
    this.setState({
      totalDeviationMax: this.totalDeviationMax,
      totalDeviationMin: this.totalDeviationMin,
      averageDeviationMax: this.averageDeviationMax,
      averageDeviationMin: this.averageDeviationMin
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
          style={{ backgroundColor: "rgba(0,0,150,0.7)", color: "white" }}
        >
          {key + 7}h-{key + 8}h{" "}
        </th>
      );
    });
  };

  isCreating = () => {
    if (!this.state.isCreating) {
      this.setState({
        isCreating: true
      });
    }
  };

  cancelCreation = () => {
    if (this.state.isCreating) {
      this.setState({
        isCreating: false
      });
    }
  };

  renderCancelCreation = () => {
    if (this.state.isCreating) {
      return (
        <div className="col-2">
          <p>Cancelar</p>
          <input type="submit" onClick={this.cancelCreation} />
        </div>
      );
    }
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
          style={{ width: "60%", display: "inline" }}
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
    console.log(event.target.value);
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

  componentDidMount = () => {
    this.getAverageAndTotalDeviation();
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
    this.totalColAverage = undefined;
    this.averageArrayAverage = undefined;
    this.hourlyAverageMaximum = undefined;
    this.colDeviationArray = [];
    this.averagesColArray = [];
    this.rowTotalsArray = [];
    this.rowAveragesArray = [];
    this.colTotalsArray = [];
    this.employeeHours = [];
    return (
      <div className="daily-quota-tracker">
        <div className="container-fluid">
          <button onClick={this.filterData}>FILTER BY NAME</button>
          <div className="row">
            <div className="col-9">
              <div className="row">
                <div className="col-2">
                  <Filters
                    nameHandler={this.nameHandler}
                    employeeName={this.state.filters.byName.nameFilter}
                  />
                </div>
                {this.renderCancelCreation()}
              </div>
              <table style={{ textAlign: "center" }} className="table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: "rgba(0,0,150,0.7)",
                        color: "white"
                      }}
                    >
                      Funcionario
                    </th>
                    {this.renderHours()}
                    <th
                      style={{
                        backgroundColor: "rgba(0,0,150,0.7)",
                        color: "white"
                      }}
                    >
                      Total:
                    </th>
                    <th
                      style={{
                        backgroundColor: "rgba(0,0,150,0.7)",
                        color: "white"
                      }}
                    >
                      Média Hora:
                    </th>
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
                <div className="col">
                  <ProductionTotal total={this.rowTotalsArray} />
                </div>
                <div className="col">
                  <ProductionAverage total={this.rowTotalsArray} />
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
