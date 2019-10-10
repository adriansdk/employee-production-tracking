import React from "react";

class ProductionTotal extends React.Component {
  state = { someKey: "someValue" };

  render() {
    return (
      <div className="total-box mx-auto">
          <h3>Produção:</h3>
        <h1>{this.props.total}</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default ProductionTotal;
