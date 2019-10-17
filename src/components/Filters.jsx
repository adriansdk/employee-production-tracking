import React from "react";

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
        <p>Nome do funcionário:</p>
        <input
          type="text"
          placeholder="Nome do novo funcionário"
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
