import React from "react";

class ProductionAverage extends React.Component {
  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
  state = {
    someKey: "someValue"
  };

  render() {
    return (
      <div className="total-box mx-auto">
        <h3>Média:</h3>
        {/* <h1>{this.showSums()}</h1> */}
      </div>
    );
  }
}

export default ProductionAverage;
