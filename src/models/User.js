const db = require('./db');

const User = db.sequelize.define('user', {
    login:{
        type: db.Sequelize.STRING
    },
    password:{
        type: db.Sequelize.STRING
    }
});

//User.sync({force: true});

module.exports = User;