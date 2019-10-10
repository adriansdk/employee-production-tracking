import React from "react";
// import DailyQuota from "../DailyQuota";
import ProductionQuota from "../ProductionQuota";
import ProductionTotal from "../ProductionTotal";

class Performance extends React.Component {
  state = { someKey: "someValue" };

  render() {
    return (
      <div className="performance">
        <div className="row">
            <ProductionQuota />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default Performance;
