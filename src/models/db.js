const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'adm_sign', 'tc14r4g9', {
    host: "sign-gama-db.ctr0lphq6xdr.us-east-2.rds.amazonaws.com",
    dialect: "postgres"
});

sequelize.authenticate().then(function(){
    console.log("Connected!")
}).catch(function(erro){
    console.log("Error: " + erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}