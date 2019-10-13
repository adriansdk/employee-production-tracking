import React from "react";

class ProductionAverage extends React.Component {
  state = {};

  componentDidMount() {}

  showAverage = () => {
    let teamDailyAverage = 0;
    this.props.total.map(eachSum => {
      teamDailyAverage += eachSum;
    });
    
    return Math.floor(teamDailyAverage/this.props.total.length);
  };

  render() {
    return (
      <div className="total-box mx-auto">
        <h3>Média:</h3>
        <h1>{this.showAverage()}</h1>
      </div>
    );
  }
}

export default ProductionAverage;
