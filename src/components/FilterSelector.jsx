import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const options = [
  { value: "recebimento", label: "Recebimento" },
  { value: "cq1", label: "CQ1" },
  { value: "cq2", label: "CQ2" },
  { value: "transbordo", label: "Transbordo" },
  { value: "separação", label: "Separação" },
  { value: "pesagem", label: "Pesagem" }
];

class FilterSelector extends React.Component {
  state = {
    selectedOption: null
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div className="selector" style={{ width: "50%" }}>
        <Select
          placeholder="Escolha um setor:"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}

export default FilterSelector;
