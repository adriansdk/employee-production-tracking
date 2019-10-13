import React from "react";

class ProductionTotal extends React.Component {
  state = { someKey: "someValue" };

  showSums = () => {
    let teamDailyTotal = 0;
    this.props.total.map(eachSum => {
      teamDailyTotal += eachSum;
    });
    return teamDailyTotal;
  };

  render() {
    return (
      <div className="total-box mx-auto">
        <h3>Produção:</h3>
        <h1>{this.showSums()}</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default ProductionTotal;
