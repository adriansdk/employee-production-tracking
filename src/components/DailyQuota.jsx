import React from "react";
import Data from "../seed/seeds.json";

class DailyQuota extends React.Component {
  state = {
    data: Data
  };

  renderTable = () => {
    return this.state.data.map((eachEmployee, key) => {
      return (
        <tr key={key}>
          <th scope="row">
            {key + 7}h-{key + 8}h{" "}
          </th>
          <td>{eachEmployee.funcionario}</td>
          <td>{eachEmployee.metaDiaria}</td>
          <td>{eachEmployee.setor}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="daily-quota-tracker">
        <div className="container">
          deploy
          <table className="table">
            <thead>
              <th scope="col">Funcionario</th>
              <th scope="col"></th>
              <th scope="col">Meta Diaria</th>
              <th scope="col">Setor</th>
            </thead>
            {this.renderTable()}
          </table>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default DailyQuota;
