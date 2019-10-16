import React from "react";
// import DailyQuota from "../DailyQuota";
import ProductionQuota from "../ProductionQuota";
import TestingComponent from "../TestingComponent"

class Performance extends React.Component {
  state = { someKey: "someValue" };

  render() {
    return (
      <div className="performance">
        <ProductionQuota/>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default Performance;
