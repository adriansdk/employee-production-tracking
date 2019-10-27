import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateFilter extends React.Component {
  state = {
    startDate: new Date()
  };

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.props.filterByDate}
      />
    );
  }
}

export default DateFilter;
