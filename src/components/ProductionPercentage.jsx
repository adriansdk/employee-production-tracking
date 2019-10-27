import React from "react";

class ProductionPercentage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue"
    };
  }

  getProductionPercentage = () => {
    let productionPercentage = this.props.productionPercentage;
    if (productionPercentage === Infinity) {
      return "Meta não definida";
    } else {
      return productionPercentage + "%";
    }
  };

  render() {
    return (
      <div className="total-box mx-auto production-container">
        <h3>% Meta:</h3>
        <h1>{this.getProductionPercentage()}</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default ProductionPercentage;
