import React from "react";

class NewEmployee extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  formSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="new-employee">
        <form action="/new-employee" method="POST" onSubmit={this.formSubmit}>
          <div className="row">
            <div className="col">
              <p>Nome do funcionário:</p>
              <input
                type="text"
                placeholder="Nome do novo funcionário"
                value={this.props.newEmployee.nome}
                onChange={this.props.nameHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Começo do expediente:</p>
              <input type="time" />
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
