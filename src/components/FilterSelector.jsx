import React from "react";
import Select from "react-select";

const options = [
  { value: "recebimento", label: "Recebimento" },
  { value: "cq1", label: "CQ1" },
  { value: "cq2", label: "CQ2" },
  { value: "transbordo", label: "Transbordo" },
  { value: "separação", label: "Separação" },
  { value: "entrega", label: "Entrega" },
  { value: "pesagem", label: "Pesagem" }
];

class FilterSelector extends React.Component {
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

export default FilterSelector;
