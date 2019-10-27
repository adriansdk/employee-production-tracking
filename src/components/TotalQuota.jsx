import React from "react";

class TotalQuota extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue"
    };
  }

  render() {
    return (
      <div className="total-box mx-auto production-container">
        <h3>Meta:</h3>
        <h1>{this.props.quota}</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default TotalQuota;
