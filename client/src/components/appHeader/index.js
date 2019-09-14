import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Header } from "./styles";

class AppHeader extends Component {

    destroySession() {
      sessionStorage.setItem('userId',"");
    }

    render() {
        return (
          <Header>
              <Link onClick={this.destroySession} to="/">Sair</Link>
          </Header>
        );
      }
}

export default withRouter(AppHeader);