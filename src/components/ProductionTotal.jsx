import React from "react";
import "./styles/ProductionTotal.scss"

class ProductionTotal extends React.Component {
  state = { someKey: "someValue" };

  showSums = () => {
    let teamDailyTotal = 0;
    this.props.total.map(eachSum => {
      teamDailyTotal += eachSum;
    });
    return Math.floor(teamDailyTotal);
  };

  render() {
    return (
      <div className="total-box mx-auto production-container">
        <p>Produção total:</p>
        <h1>{this.showSums()}</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default ProductionTotal;
