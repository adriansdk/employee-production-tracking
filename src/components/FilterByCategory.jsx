import React from "react";
import Select from "react-select";

const options = [
  { value: "todas", label: "Todas" },
  { value: "dobrados", label: "Dobrados" },
  { value: "calçados", label: "Calçados" },
  { value: "outros", label: "Outros" },
];

class FilterByCategory extends React.Component {
  render() {
    return (
      <div className="selector" style={{ width: "50%" }}>
        <Select
          placeholder="Escolha uma categoria:"
          value={this.props.selectedOption}
          onChange={this.props.handleChange}
          options={options}
        />
      </div>
    );
  }
}

export default FilterByCategory;
