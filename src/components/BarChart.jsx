import React from "react";
import { Bar } from "react-chartjs";
import Select from "react-select";
import "./styles/BarChart.scss";

const options = [
  { value: "0", label: "7h-8h" },
  { value: "1", label: "8h-9h" },
  { value: "2", label: "9h-10h" },
  { value: "3", label: "10h-11h" },
  { value: "4", label: "11h-12h" },
  { value: "5", label: "12h-13h" },
  { value: "6", label: "13h-14h" },
  { value: "7", label: "14h-15h" },
  { value: "8", label: "15h-16h" },
  { value: "9", label: "16h-17h" },
  { value: "10", label: "17h-18h" },
  { value: "todos", label: "Todos" }
];

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: "horizontalBar",
        labels: this.props.name,
        datasets: [
          {
            label: "# de produção",
            data: this.props.allHours[0],
            fillColor: ["rgba(0, 0, 255, 0.4)"],
            strokeColor: ["#007ACC"],
            borderWidth: 1
          }
        ]
      },
      selectedHour: "7hrs",
      filteredData: this.props.allHours
    };
  }

  handleChange = e => {
    let data = { ...this.state.data };
    if (e.value === "todos") {
      data.datasets[0].data = this.props.total;
      this.setState({
        data
      });
    } else {
      data.datasets[0].data = this.props.allHours[e.value];
      this.setState({
        data
      });
    }
    console.log(this.state.data.datasets);
  };

  render() {
    return (
      <div className="chart">
        <div style={{ width: "25%", margin: "20px 0px" }}>
          <h3>Escolha um horário:</h3>
          <Select
            placeholder="Escolha um horário:"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        <Bar
          data={this.state.data}
          options={{ maintainAspectRatio: false, responsive: true }}
        />
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default BarChart;
