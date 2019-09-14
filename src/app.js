'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const cors = require('cors');

const indexRotes = require('./routes/index-rotes');
const userRotes = require('./routes/user-rotes');
const consultRotes = require('./routes/consult-rotes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRotes);
app.use('/user', userRotes);
app.use('/consult', consultRotes);

module.exports = app;