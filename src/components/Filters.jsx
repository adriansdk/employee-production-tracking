import React from "react";
import "./styles/Filters.scss";

class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue"
    };
  }

  render() {
    return (
      <React.Fragment>
        <span>
          <i class="fas fa-search"></i>
        </span>
        <input
          type="text"
          placeholder="Pesquise por nome de funcionário, setor, categoria..."
          value={this.props.employeeName}
          onChange={this.props.nameHandler}
        />
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default Filters;
