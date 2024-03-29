import React from "react";
import { Bar } from "react-chartjs";
import './styles/BarChart.scss'

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: "horizontalBar",
        labels: this.props.name,
        datasets: [
          {
            label: "# of Votes",
            data: this.props.total,
            fillColor: ["rgba(0, 0, 255, 0.4)"],
            strokeColor: ["#007ACC"],
            borderWidth: 1
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="chart">
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
