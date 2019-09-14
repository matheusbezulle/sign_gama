const db = require('./db');
const User = require('./User');

const Consult = db.sequelize.define('consult', {
    sign:{
        type: db.Sequelize.STRING
    },
    ascendent:{
        type: db.Sequelize.STRING
    },
    userId:{
        type: db.Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    paranoid: true
});

//Consult.sync({force: true});

module.exports = Consult;