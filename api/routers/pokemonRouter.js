const Router = require('express').Router;

const pokemonRouter = Router();
const pokemonController = require('../controllers/pokemonController');

pokemonRouter.get(`/`, pokemonController.getAllPokemon);
pokemonRouter.get(`/:id`, pokemonController.getPokemonById);

module.exports = pokemonRouter;
