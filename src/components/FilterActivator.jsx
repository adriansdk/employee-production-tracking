import React from "react";

class FilterActivator extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: "someValue"
    };
  }

  render() {
    return (
      <button onClick={this.props.filter} className="btn btn-outline-info" style={{margin: "5px 5px", padding:"5px 3px"}}>
        {this.props.typeOfFilter}
      </button>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue"
    });
  }
}

export default FilterActivator;
