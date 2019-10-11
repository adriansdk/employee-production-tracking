import React from "react";

class NewEmployee extends React.Component {
  constructor() {
    super();
    this.state = { someKey: "someValue" };
  }

  render() {
    return (
      <div className="new-employee">
        <form action="/new-employee" method="POST">
          <div className="row">
            <div className="col">
              <p>Nome do funcionário:</p>
              <input type="text" placeholder="Nome do novo funcionário" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Começo do expediente:</p>
              <input type="time"/>
            </div>
            <div className="col">
              <p>Fim do expediente:</p>
              <input type="time" />
            </div>
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }
}

export default NewEmployee;
