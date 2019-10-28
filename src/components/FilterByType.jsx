import React from "react";
import Select from "react-select";

const options = [
  { value: "peça", label: "Peça" },
  { value: "volume", label: "Volume" }
];

class FilterByType extends React.Component {
  render() {
    return (
      <div className="selector" style={{ width: "50%" }}>
        <Select
          placeholder="Escolha um setor:"
          value={this.props.selectedOption}
          onChange={this.props.handleChange}
          options={options}
        />
      </div>
    );
  }
}

export default FilterByType;
