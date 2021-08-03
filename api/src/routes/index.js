const { Router } = require('express');
const axios = require('axios').default;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then(pokemons => res.json(pokemons.data.results))
  } catch (e) {
    console.log(e)
  }
})

router.get('/pokemons/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params;
  try {
    const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    .then(pokemons => res.json(pokemons.data))
  } catch (e) {
    console.log(e)
  }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
