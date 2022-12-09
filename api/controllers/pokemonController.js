const connection = require('../database');

const QUERY_ALL_POKEMON = `SELECT id, original_id, name, type1, type2, legendary FROM pokemon ORDER BY id, name`;
const QUERY_SPECIFIC_POKEMON = `SELECT * FROM pokemon WHERE id = ? LIMIT 0,1`;

const getAllPokemon = async (req, res) => {
  const [rows] = await connection.execute(QUERY_ALL_POKEMON);
  return res.json(rows);
}

const getPokemonById = async (req, res) => {
  const [rows] = await connection.execute(QUERY_SPECIFIC_POKEMON, [req.params.id]);

  const pokemon = rows[0]; // take the first row and assign it to pokemon

  if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' }); // if pokemon is undefined, return 404

  return res.json(pokemon); // otherwise return the found pokemon
}

const patchPokemonById = async (req, res) => {
  const { id } = req.params;


  const query = "UPDATE pokemon SET " + Object.keys(req.body).map(key => `${key} = ?`).join(", ") + " WHERE id = ?";
  const parameters = [...Object.values(req.body), id];

  const [rows] = await connection.execute(query, parameters);

  if (rows.affectedRows === 0) return res.status(404).json({ message: 'Pokemon not found' });

  return res.json({ success: true });
}

module.exports = {
  getAllPokemon,
  getPokemonById,
  patchPokemonById
}