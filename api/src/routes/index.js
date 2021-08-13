const { Router } = require('express');
const axios = require('axios').default;
const { Pokemon, Type } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

/* -----------------functions-----------------*/

const getPokemonsAPI = async (max, min) => {
    try {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${max}&offset=${min}`)
        const promises = poke.data.results.map((it) => axios.get(it.url))
        const pokemons = await Promise.all(promises).then(values => {
            return values.map((pk) => (
                {
                    id: pk.data.id,
                    name: pk.data.name,
                    hp: pk.data.stats[0].base_stat,
                    attack: pk.data.stats[1].base_stat,
                    defense: pk.data.stats[2].base_stat,
                    speed: pk.data.stats[5].base_stat,
                    height: pk.data.height,
                    weight: pk.data.weight,
                    image: pk.data.sprites.other["official-artwork"].front_default,
                    imageFrontDefault: pk.data.sprites.front_default,
                    imageBackDefault: pk.data.sprites.back_default,
                    types: pk.data.types.map((t) => {
                        return {
                            id: t.type.url.split('/')[6],
                            name: t.type.name
                        }
                    })
                }
            ))
        })
        return pokemons
    } catch (e) {
        console.log('Error', e.message)
    }
}

const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
}

const getAllPokemons = async () => {
  const apiInfo = await getPokemonsAPI(40, 0);
  const dbInfo = await getDbInfo();
  const infoResult = apiInfo.concat(dbInfo)
  return infoResult;
}

/* -----------------routes-----------------*/

router.get('/pokemons', async (req, res) => {
  const name = req.query.name;
  const allPokemons = await getAllPokemons();

  if (name) {
    let pokemonName = await allPokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    pokemonName.length ?
    res.status(200).send(pokemonName) :
    res.status(404).send('No se encontró el Pokemon')
  } else {
    res.status(200).send(allPokemons)
  }
})

router.get('/pokemons/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params;

  const pokemons = await getAllPokemons();

  if(idPokemon) {
    const pokemonFound = await pokemons.filter(e => e.id == idPokemon);

    pokemonFound.length ?
    res.status(200).send(pokemonFound) :
    res.status(404).send('No se encontró el Pokemon')
  }
});

router.get('/types', async (req, res) => {
  const typesApi = await axios.get('https://pokeapi.co/api/v2/type/');
  const types =  typesApi.data.results.map(e => {
    return {
      id: e.url.split('/')[6],
      name: e.name
    }});
  types.forEach(e => {
    Type.findOrCreate({
      where: {
        id: e.id,
        name: e.name
      }
    })
  })
  const allTypes = await Type.findAll();
  return res.status(200).send(allTypes);
});

router.post('/pokemons', async (req, res) => {
  const { name, type, hp, attack, defense, speed, height, weight, image } = req.body;

  let pokemonCreated = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image
  });

  let typeDb = await Type.findAll({
    where: {name: type}
  });
  pokemonCreated.addType(typeDb);
  res.send('Pokemon creado con éxito.')
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
