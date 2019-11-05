import React from "react";
import "react-table/react-table.css";
import Data from "../seed/seeds.json";
import _ from "lodash";

class Testing extends React.Component {
  constructor() {
    super();

    this.state = {
      data: Data,
      colHours: [],
      selectedSector: { label: "Todos", value: "todos" },
      selectedType: { label: "Peça", value: "peça" }
    };
  }

  filterHours = (eachEmployee, index) => {
    let hours = [];
    if (this.state.selectedType.value === "peça") {
      for (let index = 0; index < eachEmployee.setor.length; index++) {
        hours = eachEmployee.setor[index].horaPeca;
      }
    } else if (this.state.selectedType.value === "volume") {
      for (let index = 0; index < eachEmployee.setor.length; index++) {
        hours = eachEmployee.setor[index].horaVolume;
      }
    }
    if (
      this.state.selectedSector.value === "todos" &&
      this.state.selectedType.value === "peça"
    ) {
      let nextSector = [];
      let sumOfAllSectorsPiece = [];
      for (let index = 0; index < eachEmployee.setor.length; index++) {
        if (eachEmployee.setor[index + 1]) {
          nextSector = eachEmployee.setor[index].horaPeca;
        }
        sumOfAllSectorsPiece = eachEmployee.setor[index].horaPeca.map(
          (eachPieceHour, x) => {
            return eachPieceHour + nextSector[x];
          }
        );
      }
      hours = sumOfAllSectorsPiece;
    } else if (
      this.state.selectedSector.value === "todos" &&
      this.state.selectedType.value === "volume"
    ) {
      let nextSector = [];
      let sumOfAllSectorsVolume = [];
      for (let index = 0; index < eachEmployee.setor.length; index++) {
        if (eachEmployee.setor[index + 1]) {
          nextSector = eachEmployee.setor[index].horaVolume;
        }
        sumOfAllSectorsVolume = eachEmployee.setor[index].horaVolume.map(
          (eachPieceHour, x) => {
            return eachPieceHour + nextSector[x];
          }
        );
      }
      hours = sumOfAllSectorsVolume;
    }
    return hours;
  };

  renderEmployeeName = () => {
    return this.state.data.map(eachEmployee => {
      let employeeName = eachEmployee.funcionario;
      return <tr>{employeeName}</tr>;
    });
  };

  getEmployeeHours = () => {
    let employeeHours = [];
    this.state.data.map((eachEmployee, index) => {
      employeeHours.push(this.filterHours(eachEmployee, index));
    });
  };

  getColHours = () => {
    const colHours = [];
    for (let i = 0; i < this.employeeHours[0].length; i++) {
      this.employeeHours.forEach(hours => {
        if (!Array.isArray(colHours[i])) {
          colHours[i] = [];
        }
        colHours[i].push(hours[i]);
      });
    }
    this.setState({
      colHours
    });
  };

  render() {
    return (
      <table>
        <tr>
          <th>Funcionario:</th>
        </tr>
        {this.renderEmployeeName()}
      </table>
    );
  }
}

export default Testing;
