import React from "react";
import Data from "../seed/seeds.json";
import ProductionTotal from "./ProductionTotal";
import BarChart from "./BarChart.jsx";
import DateFilter from "./DateFilter.jsx";
import FilterActivator from "./FilterActivator.jsx";
import "./styles/ProductionQuota.scss";
import TotalQuota from "./TotalQuota.jsx";
import MissingQuota from "./MissingQuota.jsx";
import ProductionPercentage from "./ProductionPercentage.jsx";
import TableLegend from "./TableLegend.jsx";
import FilterSelector from "./FilterSelector.jsx";
import FilterByType from "./FilterByType.jsx";
import FilterByCategory from "./FilterByCategory.jsx";
import _ from "lodash";

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
    this.totalProductionPercentage = undefined;
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
      selectedSector: { label: "Todos", value: "todos" },
      selectedType: { label: "Peça", value: "peça" },
      selectedCategory: null,
      selectedDate: new Date()
    };
  }

  filterBySector = selectedSector => {
    this.setState({ selectedSector }, () =>
      console.log(`Option selected:`, this.state.selectedSector)
    );
    let filteredArray = [];
    this.state.data.map(eachEmployee => {
      for (let i = 0; i < eachEmployee.setor.length; i++) {
        if (eachEmployee.setor[i].nome === selectedSector.label) {
          filteredArray.push(eachEmployee);
        }
      }
    });
    if (selectedSector.label === "Todos") {
      this.setState({ filteredData: this.state.data });
    } else {
      this.setState({ filteredData: filteredArray });
    }
  };

  filterByType = selectedType => {
    this.setState({ selectedType });
  };

  // filterByCategoy = selectedSector => {
  //   this.setState({ selectedSector }, () =>
  //     console.log(`Option selected:`, this.state.selectedSector)
  //   );
  //   let filteredArray = [];
  //   this.state.data.map(eachEmployee => {
  //     for (let i = 0; i < eachEmployee.setor.length; i++) {
  //       if (eachEmployee.setor[i].nome === selectedSector.label) {
  //         filteredArray.push(eachEmployee);
  //       }
  //     }
  //   });
  //   this.setState({ filteredData: filteredArray });
  // };

  filterByDate = selectedDate => {
    this.setState({ selectedDate }, () =>
      console.log(`Date selected:`, this.state.selectedDate)
    );
    let filteredArray = [];
    this.state.data.map(eachEmployee => {
      for (let i = 0; i < eachEmployee.data.length; i++) {
        if (eachEmployee.data === selectedDate) {
          filteredArray.push(eachEmployee);
        }
      }
    });
    // this.setState({ filteredData: filteredArray });
  };

  renderTable = () => {
    let rows = [];
    rows = this.state.filteredData.map((eachEmployee, key) => {
      this.employeeNames.push(eachEmployee.funcionario);
      this.averagesColArray.push(
        Math.round(
          _.sum(eachEmployee.setor[0].horaPeca) /
            eachEmployee.setor[0].horaPeca.length
        )
      );
      this.colTotalsArray.push(_.sum(eachEmployee.setor[0].horaPeca));
      return (
        <tr key={key}>
          <th onMouseOver={this.getEmployeeData}>{eachEmployee.funcionario}</th>
          {this.renderHourlyTotal(eachEmployee)}
        </tr>
      );
    });
    let deviationRow = this.state.filteredData[0].setor[0].horaPeca.map(
      (eachHour, key) => {
        return <td>{this.renderDeviation(key)}</td>;
      }
    );
    let maximumRow = this.state.filteredData[0].setor[0].horaPeca.map(
      (eachHour, key) => {
        return <td>{this.renderMax(key)}</td>;
      }
    );
    let minimumRow = this.state.filteredData[0].setor[0].horaPeca.map(
      (eachHour, key) => {
        return <td>{this.renderMin(key)}</td>;
      }
    );
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
        <td style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>
          {this.getTotalQuota()}
        </td>
        <td style={{ backgroundColor: "rgba(11,11,11,0.1)" }}>
          {this.getAverageQuota()}
        </td>
      </tr>,
      <tr>
        <th style={{ borderBottom: "0px" }}>% Atingimento:</th>
        {this.renderProduction()}
        {this.renderProductionTotal()}
      </tr>
    );
    return rows;
  };

  getEmployeeData = e => {
    let employee = this.state.data.filter(
      funcionario => funcionario.funcionario === e.target.innerHTML
    );
  };

  filterHours = eachEmployee => {
    let hours = [];
    if (this.state.selectedType.value === "peça") {
      hours = eachEmployee.setor[0].horaPeca;
    } else if (this.state.selectedType.value === "volume") {
      hours = eachEmployee.setor[0].horaVolume;
    }
    if (
      this.state.selectedSector.value === "todos" &&
      this.state.selectedType.value === "peça"
    ) {
      let nextSector = [];
      let sumOfAllSectorsPiece = [];
      for (let index = 0; index < eachEmployee.setor.length; index++) {
        if (eachEmployee.setor[index + 1]) {
          nextSector = eachEmployee.setor[index + 1].horaPeca;
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
          nextSector = eachEmployee.setor[index + 1].horaVolume;
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

  renderHourlyTotal = eachEmployee => {
    let sectorIndex = eachEmployee.setor
      .map(e => e.nome)
      .indexOf(this.state.selectedSector.label);
    let hours = this.filterHours(eachEmployee);
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
      teamTotal.push(
        this.state.filteredData[x].setor[0].horaPeca[specificHour]
      );
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
    let max = this.totalDeviation + _.sum(this.rowAveragesArray);
    this.totalDeviationMax = max;
    return max;
  };

  renderAverageDeviationMax = () => {
    let averageDeviationMax = this.averageArrayAverage + this.averageDeviation;
    this.averageDeviationMax = averageDeviationMax;
    return averageDeviationMax;
  };

  renderTotalDeviationMin = () => {
    let min = _.sum(this.rowAveragesArray) - this.totalDeviation;
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
    let hours = this.state.filteredData[index].setor[0].horaPeca;
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

  editableCell = (tableCellContent, key) => {
    return (
      <td key={key} onClick={this.editCell}>
        <p>{tableCellContent}</p>
        <input
          style={{ width: "30%", display: "inline", height: "20px" }}
          type="text"
          onChange={e => this.editCell(e, key)}
          value={this.state.funcionario.setor[0].horaPeca[key]}
        ></input>
      </td>
    );
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
              width: "50%",
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
    this.totalQuota = _.sum(this.state.quotas);
    return this.totalQuota;
  };

  getAverageQuota = () => {
    this.totalQuota = _.sum(this.state.quotas);
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
    let quotasTotal = _.sum(this.state.quotas);
    let percentage = (total / quotasTotal) * 100;
    let totalProductionPercentage = Math.round(percentage * 10) / 10;
    this.totalProductionPercentage = totalProductionPercentage;
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
    let deviationsArray = this.state.filteredData[0].setor[0].horaPeca.map(
      (eachHour, key) => {
        return this.renderDeviation(key);
      }
    );

    let maximumDeviationRow = this.state.filteredData[0].setor[0].horaPeca.map(
      (eachHour, key) => {
        return this.renderMax(key);
      }
    );
    let minimumDeviationRow = this.state.filteredData[0].setor[0].horaPeca.map(
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
    this.totalProductionPercentage = undefined;
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
            <div className="col">
              <div className="row">
                <div className="col px-0">
                  <h3>Data:</h3>
                  <DateFilter
                    filterByDate={this.filterByDate}
                    selectedDate={this.state.selectedDate}
                  />
                </div>
                <div className="col px-0">
                  <h3>Setor:</h3>
                  <FilterSelector
                    handleChange={this.filterBySector}
                    selectedOption={this.state.selectedOption}
                  />
                </div>
                <div className="col px-0">
                  <h3>Tipo:</h3>
                  <FilterByType
                    handleChange={this.filterByType}
                    selectedOption={this.state.selectedType}
                  />
                </div>
                <div className="col px-0">
                  {/* <h3>Categoria:</h3>
                  <FilterByCategory
                    handleChange={this.filterByCategory}
                    selectedOption={this.state.selectedCategory}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <table
              style={{ textAlign: "center", marginTop: "3px" }}
              className="my-table"
            >
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
            <TableLegend />
          </div>
          <div className="row">
            <div className="col">
              <ProductionTotal total={this.rowTotalsArray} />
            </div>
            <div className="col">
              <TotalQuota quota={this.totalQuota} />
            </div>
            <div className="col">
              <MissingQuota
                missingQuota={this.totalQuota - _.sum(this.rowTotalsArray)}
              />
            </div>
            <div className="col">
              <ProductionPercentage
                productionPercentage={this.totalProductionPercentage}
              />
            </div>
          </div>
          <div className="row">
            <BarChart name={this.employeeNames} total={this.colTotalsArray} />
          </div>
        </div>
      </div>
    );
  }
}

export default Quota;
