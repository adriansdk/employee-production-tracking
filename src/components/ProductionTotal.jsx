import React from "react";

class ProductionTotal extends React.Component {
  state = { someKey: "someValue" };

  showSums = () => {
    let teamDailyTotal = 0;
    let lastRow = this.props.total.map(eachSum => {
      // teamDailyTotal += eachSum;
      console.log(eachSum)
    });
    lastRow.push({ teamDailyTotal });
    console.log(lastRow)
    return lastRow;
  };

  render() {
    return (
      <div className="total-box mx-auto">
        <h3>Produção:</h3>
        {/* <h1>{this.showSums()}</h1> */}
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default ProductionTotal;
