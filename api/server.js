require('dotenv').config(); // load env file into `process.env` as early as possible

const cors = require('cors');
const express = require('express');
const basicAuth = require('express-basic-auth');

require('express-async-errors');

const pokemonRouter = require('./routers/pokemonRouter');

// setup some runtime constants
const PORT = process.env.PORT || 3000;
const HTTP_BASIC_USER = process.env.HTTP_BASIC_USER || 'ceezer';
const HTTP_BASIC_PASSWORD = process.env.HTTP_BASIC_PASSWORD || 'hireme';
const HTTP_BASIC_AUTH_USERS = {
  [HTTP_BASIC_USER]: HTTP_BASIC_PASSWORD
}
const DEFAULT_ORIGIN = `${process.env.UI_PROTOCOL}://${process.env.UI_HOST}:${process.env.UI_PORT}`;

// create the express app
const app = express();

// use some global middleware
app.use(cors({
  origin: DEFAULT_ORIGIN,
  methods: ['GET', 'PATCH']
}));
app.use(express.json());
app.use(basicAuth({
  users: HTTP_BASIC_AUTH_USERS,
  challenge: true
}));

// use routers with a base path
app.use('/api/pokemons', pokemonRouter);

// start server
const server = app.listen(PORT, () => {
  console.log(`API Server started on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to directly access the API`);
});

// handle node process shutdown
const gracefullyShutDown = () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

process.on('SIGTERM', gracefullyShutDown);
process.on('SIGINT', gracefullyShutDown);
process.on('SIGUSR2', gracefullyShutDown); // when nodemon restarts the process