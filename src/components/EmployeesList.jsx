import React from "react";

class EmployeesList extends React.Component {
  state = { someKey: "someValue" };

  render() {
    return <p>{this.state.someKey}</p>;
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default EmployeesList;
