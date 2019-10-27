import React from "react";

class MissingQuota extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue"
    };
  }

  getMissingQuota = () => {
    let missingQuota = this.props.missingQuota;
    if (missingQuota < 0) {
      return "Meta atingida";
    } else {
      return missingQuota;
    }
  };

  render() {
    return (
      <div className="total-box mx-auto production-container">
        <h3>Meta a cumprir:</h3>
        <h1>{this.getMissingQuota()}</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default MissingQuota;
