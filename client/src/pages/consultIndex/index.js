import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./styles";
import AppHeader from '../../components/appHeader';
import ConsultForm from '../../components/consultForm';
import SignTable from '../../components/consultTable';

import "react-datepicker/dist/react-datepicker.css";

class ConsultIndex extends Component {
  
  render() {
    return (
      <Container>
        <AppHeader />
        <ConsultForm />
        <SignTable />
      </Container>
    );
  }
}

export default withRouter(ConsultIndex);