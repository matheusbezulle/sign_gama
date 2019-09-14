import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import ReactTable from "react-table";
import "react-table/react-table.css";

class SignTable extends Component {

  constructor () {
    super();

    this.state = {
        tableData: [{
            createdAt: '',
            sign: '',
            ascendent: ''
        }],
    };
}

componentDidMount () {
  api.get("/consult/findByUser/" + sessionStorage.getItem("userId"), {
        responseType: 'json'
    }).then(response => {
        response.data.forEach(function(consult){
          consult.createdAt = consult.createdAt.substring(0, consult.createdAt.length - 1);
          consult.createdAt = new Date(consult.createdAt).toLocaleDateString("pt-BR");
        });
        this.setState({ tableData: response.data });
    });
}
  
  render() {
    const { tableData } = this.state; 
    return (
      <div>
        <ReactTable
          data={tableData}
          columns={[
            {
              Header: "Data da Consulta",
              accessor: "createdAt"
            },
            {
              Header: "Signo",
              accessor: "sign"
            },
            {
              Header: 'Ascendente',
              accessor: "ascendent"
            },
            {
              Header: "Excluir",
              id:'excluir',
              Cell: (row)=> (
              <span style={{cursor:'pointer',color:'blue',textDecoration:'none'}}
                    onClick={() => {
                        api.delete("/consult/" + this.state.tableData[row.index].id).then(consult => {
                          let data = this.state.tableData;
                          data.splice(row.index, 1);
                          this.setState({data});
                        });
                      }}>
                        Excluir
                      </span> 
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default withRouter(SignTable);