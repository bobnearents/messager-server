'use strict';

const knex = require('knex');
const app = require('./app');
const socket = require('socket.io');
const { PORT, DB_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db', db); 
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

const io = socket(httpServer);
app.set('io', io);

io.on('connection', function (socket) {
  console.log('an user connected');
});