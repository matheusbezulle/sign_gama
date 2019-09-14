import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Form, Container } from "./styles";
import api from "../../services/api";

class SignUp extends Component {
  state = {
    login: "",
    password: "",
    confirmPassword: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { login, password, confirmPassword } = this.state;
    if (!login || !password || !confirmPassword)
        this.setState({ error: "Preencha todos os dados para se cadastrar" });
    else if(password !== confirmPassword)
        this.setState({ error: "A confirmação da senha está diferente da senha digitada." });
    else {
        try {
          await api.post("/user/", { login, password });
          this.props.history.push("/");
        } catch (err) {
          if(err.response !== undefined && err.response.status === 401)
            this.setState({ error: "Usuário já existente." });
          else
            this.setState({ error: "Ocorreu um erro ao registrar. Tente novamente." });
        }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Usuário..."
            maxlength="50"
            onChange={e => this.setState({ login: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha..."
            maxlength="30"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirmar Senha..."
            maxlength="30"
            onChange={e => this.setState({ confirmPassword: e.target.value })}
          />
          <button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Já possui uma conta?</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);