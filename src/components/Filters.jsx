import React from "react";
import "./styles/Filters.scss";

class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue"
    };
  }

  render() {
    return (
      <div className="filter">
        <p>Pesquise por nome de funcionário, setor ou categoria:</p>
        <input
          type="text"
          placeholder='Ex:"Adrian", "Production", "Shoes"...'
          value={this.props.employeeName}
          onChange={this.props.nameHandler}
        />
        <span className="search-icon">
          <i class="fas fa-search"></i>
        </span>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default Filters;
