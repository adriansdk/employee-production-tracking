import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateFilter extends React.Component {
  state = {};

  render() {
    return (
      <DatePicker
        selected={this.props.selectedDate}
        onChange={this.props.filterByDate}
      />
    );
  }
}

export default DateFilter;
