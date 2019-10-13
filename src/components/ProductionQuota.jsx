import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import "./styles/Quota.scss";
import NewEmployee from "./NewEmployee.jsx";
import ProductionAverage from "./ProductionAverage.jsx";

class Quota extends React.Component {
  constructor() {
    super();
    this.sums = [];
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
    rows.push(<tr>
      <th>Média</th>
      {this.renderTeamAverage()}
    </tr>)
    return rows;
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

  showSums = () => {
    let teamDailyTotal = 0;
    let teamTotalRow = this.sums.map((eachSum, key) => {
      teamDailyTotal += eachSum;
      return <td key={key}>{eachSum}</td>;
    });
    teamTotalRow.push(
      <th>{teamDailyTotal}</th>,
      <th>{teamDailyTotal / this.sums.length}</th>
    );
    return teamTotalRow;
  };

  renderTeamAverage = () => {
    let teamDailyTotal = 0;
    let averages = this.sums.map((eachSum, key) => {
      teamDailyTotal += eachSum;
      return <td>{Math.floor(eachSum/this.state.seed.length)}</td>
    })
    let teamDailyAverage = teamDailyTotal/this.state.seed.length
    averages.push(
      <td>{Math.floor(teamDailyAverage)}</td>,
      <td>{Math.floor(teamDailyAverage/this.sums.length)}</td>
    )
    return averages
  }

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
    console.log(newArray);
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
    this.sums = [];
    return (
      <div className="daily-quota-tracker">
        <div className="container-fluid">
          <div className="row">
            <div className="col-9">
              <div className="row">
                <div className="col-2">
                  {/* <p>{this.createButton()}</p> */}
                  <input type="submit" onClick={this.isCreating} />
                </div>
                {this.renderCancelCreation()}
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
                  <ProductionTotal total={this.sums} />
                </div>
                <div className="col">
                  <ProductionAverage total={this.sums} />
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
