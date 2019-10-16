import React from "react";
import  "../thing";

class Home extends React.Component {
  state = { someKey: "someValue" };

  render() {
    return (
      <div>
        <h1>Home page</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default Home;
