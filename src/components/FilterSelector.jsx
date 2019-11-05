import React from "react";
import Select from "react-select";

const options = [
  { value: "cq1", label: "CQ1" },
  { value: "cq2", label: "CQ2" },
  { value: "entrega", label: "Entrega" },
  { value: "pesagem", label: "Pesagem" },
  { value: "recebimento", label: "Recebimento" },
  { value: "separação", label: "Separação" },
  { value: "todos", label: "Todos" },
  { value: "transbordo", label: "Transbordo" },
];

class FilterSelector extends React.Component {
  render() {
    console.log(this.props.selectedOption)
    return (
      <div className="selector" style={{ width: "100%" }}>
        <Select
          placeholder="Escolha um setor:"
          value={this.props.selectedOption}
          onChange={this.props.handleChange}
          options={options}
          defaultValue ={{ label: "Todos", value: "todos" }}
        />
      </div>
    );
  }
}

export default FilterSelector;
