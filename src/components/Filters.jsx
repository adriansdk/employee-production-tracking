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
        <h3>Pesquise por nome:</h3>
        <input
          type="text"
          placeholder="Nome do funcionário"
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
