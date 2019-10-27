import React from "react";

class TableLegend extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue"
    };
  }

  render() {
    return (
      <div className="legend" style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,0,0,0.3)",
            height: "15px",
            width: "25px",
            border: "1px black solid",
            marginRight: "5px"
          }}
        ></div>
        <span>Abaixo do Mínimo</span>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(0,0,255,0.3)",
            height: "15px",
            width: "25px",
            border: "1px black solid",
            margin: "0px 10px"
          }}
        ></div>
        <span>Acima do máximo</span>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default TableLegend;
