const cors = require('cors');
const Router = require('express').Router;

const DEFAULT_ORIGIN = `${process.env.UI_PROTOCOL}://${process.env.UI_HOST}:${process.env.UI_PORT}`;

const pokemonRouter = Router();
const pokemonController = require('../controllers/pokemonController');

pokemonRouter.use(cors({
  origin: DEFAULT_ORIGIN,
  optionsSuccessStatus: 200
}))

pokemonRouter.get(`/`, pokemonController.getAllPokemon);
pokemonRouter.get(`/:id`, pokemonController.getPokemonById);

module.exports = pokemonRouter;
