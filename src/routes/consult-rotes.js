'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/consult-controller');
const request = require('request');
const bodyParser = require('body-parser');

router.get('/', (req, res, next) => {
    controller.get(req, res, next);
});

router.post('/', (req, res, next) => {
    controller.post(req, res, next);
});

router.delete('/:consultId', (req, res, next) => {
    controller.delete(req, res, next);
});

router.get('/findByUser/:userId', (req, res, next) => {
    controller.findByUser(req, res, next);
});

module.exports = router;