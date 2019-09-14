import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { Consult } from "../../pages/consultIndex/styles";
import api from "../../services/api";

class ConsultForm extends Component {

  state = {
    birthday: new Date(),
    sign: "-",
    ascendent: "-"
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { birthday } = this.state;
    try {
      await api.post("/consult/", { "birthday": new Date(birthday).getTime(), userId: sessionStorage.getItem("userId") }).then(consult => {
        this.setState({
          sign: consult.data.sign,
          ascendent: consult.data.ascendent
        });
      });
    } catch (err) {
      this.setState({ error: "Ocorreu um erro ao efetuar a consulta. Tente novamente." });
    }
  };

  componentDidMount() {
    if(sessionStorage.getItem("userId") == null || sessionStorage.getItem("userId") === ""){
      this.props.history.push("/");
    }
  }

  render() { 
    return (
      <Consult onSubmit={this.handleSignIn}>
        <div>
          {this.state.error && <p>{this.state.error}</p>}<br />
        </div>        
        <div className="consult-input-field">
          <label>Data e Hora de Nascimento</label>
          <DatePicker
            selected={this.state.birthday}
            onChange={date => { this.setState({ birthday: date }) }}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        
        <button type="submit" className="default-button">Buscar</button>

        <div className="consult-input-field">
          <label>Signo</label>
          <label>{this.state.sign}</label>
        </div>

        <div className="consult-input-field">
          <label>Ascendente</label>
          <label>{this.state.ascendent}</label>
        </div>
      </Consult>
    );
  }
}

export default withRouter(ConsultForm);