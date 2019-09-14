'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');

router.get('/', (req, res, next) => {
    controller.get(req, res, next);
});

router.post('/', (req, res, next) => {
    controller.post(req, res, next);
});

router.post('/authenticate', (req, res, next) => {
    controller.authenticate(req, res, next);
});

module.exports = router;