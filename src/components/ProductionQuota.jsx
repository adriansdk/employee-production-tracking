import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import "./styles/Quota.scss";
import NewEmployee from "./NewEmployee.jsx";
import ProductionAverage from "./ProductionAverage.jsx";

class Quota extends React.Component {
  constructor() {
    super();
    this.totalDeviation = undefined;
    this.averageDeviation = undefined;
    this.totalColAverage = undefined;
    this.averageArrayAverage = undefined;

    this.colDeviationArray = [];
    this.averagesColArray = [];

    this.rowTotalsArray = [];
    this.rowAveragesArray = [];
    this.colTotalsArray = [];
    this.employeeHours = [];
    this.state = {
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
      return this.renderDeviation(key);
    });
    let maximumRow = this.state.seed[0].horas.map((eachHour, key) => {
      return this.renderMax(key);
    });
    let minimumRow = this.state.seed[0].horas.map((eachHour, key) => {
      return this.renderMin(key);
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
        {this.renderDailyAverageDeviation()}
      </tr>,
      <tr>
        <th>Máximo:</th>
        {maximumRow}
        {this.renderTotalDeviationMax()}
        {this.renderAverageDeviationMax()}
      </tr>,
      <tr>
        <th>Mínimo:</th>
        {minimumRow}
        {this.renderTotalDeviationMin()}
        {this.renderAverageDeviationMin()}
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
      return <td key={key}>{eachHour}</td>;
    });
    columns.push(
      <td>{Math.round(total)}</td>,
      <td>{Math.round(total / hours.length)}</td>
    );
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
    return <td>{Math.round(s)}</td>;
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

    return <td>{Math.round(s)}</td>;
  };

  reducer = (total, num) => {
    return total + num;
  };

  renderMax = index => {
    let teamTotal = this.rowTotalsArray[index];
    this.rowAveragesArray.push(Math.round(teamTotal / this.state.seed.length));
    return (
      <td>
        {Math.round(
          this.colDeviationArray[index] + this.rowAveragesArray[index]
        )}
      </td>
    );
  };

  renderTotalDeviationMax = () => {
    return (
      <td>
        {this.totalDeviation + this.rowAveragesArray.reduce(this.reducer)}
      </td>
    );
  };

  renderAverageDeviationMax = () => {
    return <td>{this.averageArrayAverage + this.averageDeviation}</td>;
  };

  renderTotalDeviationMin = () => {
    return (
      <td>
        {this.rowAveragesArray.reduce(this.reducer) - this.totalDeviation}
      </td>
    );
  };

  renderAverageDeviationMin = () => {
    return <td>{this.averageArrayAverage - this.averageDeviation}</td>;
  };

  renderMin = index => {
    return (
      <td>
        {Math.round(
          this.rowAveragesArray[index] - this.colDeviationArray[index]
        )}
      </td>
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

  hoursHandler = () => {};

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

    this.totalDeviation = undefined;
    this.averageDeviation = undefined;
    this.totalColAverage = undefined;
    this.averageArrayAverage = undefined;

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
