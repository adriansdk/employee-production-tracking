import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import "./styles/Quota.scss";
import NewEmployee from "./NewEmployee.jsx";
import ProductionAverage from "./ProductionAverage.jsx";

class Quota extends React.Component {
  constructor() {
    super();
    this.totalColAverage = undefined;
    this.averageArrayAverage = undefined;
    this.hourlyAverageMaximum = undefined;

    this.colDeviationArray = [];
    this.averagesColArray = [];

    this.rowTotalsArray = [];
    this.rowAveragesArray = [];
    this.colTotalsArray = [];
    this.employeeHours = [];
    this.state = {
      averageDeviationMin: [],
      averageDeviationMax: [],
      hourlyAverageMaximum: [],

      maximumDeviationRow: [],
      minimumDeviationRow: [],

      totalDeviationMax: [],
      totalDeviationMin: [],

      filters: ["setor", "tipo"],
      seed: Data,
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

  renderTable = () => {
    let rows = this.state.seed.map((eachEmployee, key) => {
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
    let deviationRow = this.state.seed[0].horas.map((eachHour, key) => {
      return <td>{this.renderDeviation(key)}</td>;
    });
    let maximumRow = this.state.seed[0].horas.map((eachHour, key) => {
      return <td>{this.renderMax(key)}</td>;
    });
    let minimumRow = this.state.seed[0].horas.map((eachHour, key) => {
      return <td>{this.renderMin(key)}</td>;
    });
    rows.push(
      <tr>
        <th>Total:</th>
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
        <td style={{ backgroundColor: "rgba(0,0,255, 0.3)" }}>{Math.round(total)}</td>
      );
    } else if (total < this.state.totalDeviationMin) {
      columns.push(
        <td style={{ backgroundColor: "rgba(255,0,0,0.3)" }}>{Math.round(total)}</td>
      );
    } else {
      columns.push(<td>{Math.round(total)}</td>);
    }
    if (total / hours.length > this.state.hourlyAverageMaximum) {
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
      return <td key={key}>{eachSum}</td>;
    });
    teamTotalRow.push(
      <th>{Math.round(teamDailyTotal)}</th>,
      <th>{Math.round(teamDailyTotal / this.rowTotalsArray.length)}</th>
    );
    return teamTotalRow;
  };

  renderTeamAverage = () => {
    let teamDailyTotal = 0;
    let averages = this.rowTotalsArray.map((eachSum, key) => {
      teamDailyTotal += eachSum;
      return <td>{Math.round(eachSum / this.state.seed.length)}</td>;
    });
    let teamDailyAverage = teamDailyTotal / this.state.seed.length;
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
    for (let x = 0; x < this.state.seed.length; x++) {
      teamTotal.push(this.state.seed[x].horas[specificHour]);
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
    this.rowAveragesArray.push(Math.round(teamTotal / this.state.seed.length));
    return Math.round(
      this.colDeviationArray[index] + this.rowAveragesArray[index]
    );
  };

  renderTotalDeviationMax = () => {
    return this.totalDeviation + this.rowAveragesArray.reduce(this.reducer);
  };

  renderAverageDeviationMax = () => {
    return this.averageArrayAverage + this.averageDeviation;
  };

  renderTotalDeviationMin = () => {
    return this.rowAveragesArray.reduce(this.reducer) - this.totalDeviation;
  };

  renderAverageDeviationMin = () => {
    return this.averageArrayAverage - this.averageDeviation;
  };

  renderMin = index => {
    return Math.round(
      this.rowAveragesArray[index] - this.colDeviationArray[index]
    );
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
              backgroundColor: "rgba(33,33,33, 0.2)",
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
          <tr style={{ backgroundColor: "rgba(33,33,33, 0.2)" }}>
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

  newEmployeeForm = () => {
    if (this.state.isCreating) {
      return (
        <NewEmployee
          nameHandler={this.nameHandler}
          newEmployee={this.state.funcionario}
        />
      );
    }
  };

  createButton = () => {
    if (this.state.isCreating) {
      return <p>Criando novo usuário</p>;
    } else if (!this.state.isCreating) {
      return <p>Crie novo usuário</p>;
    }
  };

  nameHandler = event => {
    this.setState({
      funcionario: {
        nome: event.target.value,
        setor: this.state.funcionario.setor,
        tipo: this.state.funcionario.tipo,
        horas: this.state.funcionario.horas,
        metaDiaria: this.state.funcionario.metaDiaria,
        totalDiario: this.state.funcionario.totalDiario
      }
    });
  };

  componentDidMount = () => {
    let hourlyAverageMaximum = this.renderAverageDeviationMax();
    let averageDeviationMin = this.renderAverageDeviationMin();
    let averageDeviationMax = this.renderDailyAverageDeviation();

    let deviationsArray = this.state.seed[0].horas.map((eachHour, key) => {
      return this.renderDeviation(key);
    });

    let maximumDeviationRow = this.state.seed[0].horas.map((eachHour, key) => {
      return this.renderMax(key);
    });
    let minimumDeviationRow = this.state.seed[0].horas.map((eachHour, key) => {
      return this.renderMin(key);
    });

    let totalDeviationMax = this.renderTotalDeviationMax();
    let totalDeviationMin = this.renderTotalDeviationMin();

    this.setState({
      averageDeviationMax: averageDeviationMax,
      averageDeviationMin: averageDeviationMin,

      deviationsArray: deviationsArray,
      maximumDeviationRow: maximumDeviationRow,
      minimumDeviationRow: minimumDeviationRow,

      totalDeviationMax: totalDeviationMax,
      totalDeviationMin: totalDeviationMin,

      hourlyAverageMaximum: hourlyAverageMaximum
    });
  };

  render() {
    // console.log(this.totalDeviation)
    // console.log(this.averageDeviation)
    // console.log(this.totalColAverage)
    // console.log(this.colDeviationArray)
    // console.log(this.averagesColArray)
    // console.log(this.rowTotalsArray)
    // console.log(this.rowAveragesArray)
    // console.log(this.colTotalsArray)
    // console.log(this.employeeHours)

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
          <div className="row">
            <div className="col-9">
              <div className="row">
                <div className="col-2">
                  {/* <p>{this.createButton()}</p> */}
                  {/* <input type="submit" onClick={this.isCreating} /> */}
                </div>
                {/* {this.renderCancelCreation()} */}
              </div>
              <table style={{ textAlign: "center" }} className="table">
                <thead>
                  <tr>
                    <th scope="col">Funcionario</th>
                    {this.renderHours()}
                    <th>Total:</th>
                    <th>Média Hora:</th>
                  </tr>
                  {this.newEmployeeRow()}
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
                <div className="row">{this.newEmployeeForm()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quota;
