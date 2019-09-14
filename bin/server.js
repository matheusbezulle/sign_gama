'use strict';

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = process.env.port || 3030;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log("Server started on port: " + port);