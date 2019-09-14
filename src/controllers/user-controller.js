'use strict';

const User = require('../models/User.js');

exports.post = (req, res, next) => {
    User.findAll({ where: { login: req.body.login } }).then(function(user){
        if (user.length == 0) {
            User.create({
                login: req.body.login,
                password: req.body.password
            });
            res.status(200).send(true);
        } else {
            res.status(401).send(false);
        }
    });
};

exports.get = (req, res, next) => {
    User.findAll({ raw: true }).then(function(users){
        res.status(200).send(users);
    });
};

exports.authenticate = (req, res, next) => {
    User.findAll({ where: { login: req.body.login, password: req.body.password } }).then(function(user){
        if(user.length == 0)
            res.status(200).send({userId: null, authenticated: false});
        else{
            console.log(user[0].id);
            res.status(200).send({userId: user[0].id, authenticated: true});

        }
    });
};