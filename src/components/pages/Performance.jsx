import React from "react";
import ProductionQuota from "../ProductionQuota";
import "../styles/Performance.scss"
class Performance extends React.Component {
  state = { someKey: "someValue" };

  render() {
    return (
      <div className="performance">
        <ProductionQuota />
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default Performance;
