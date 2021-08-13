import axios from 'axios';

export function getPokemons() {
  return async function(dispatch) {
    let pokemons = await axios.get('http://localhost:3001/pokemons');
    return dispatch({
      type: 'GET_POKEMONS',
      payload: pokemons.data
    });
  }
}
export function getNamePokemons(name) {
  return async function(dispatch) {
    try {
      let pokemons = await axios.get("http://localhost:3001/pokemons?name=" + name)
      return dispatch({
        type: 'GET_NAME_POKEMONS',
        payload: pokemons.data
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export function getTypes() {
  return async function(dispatch) {
    try {
      let types = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: 'GET_TYPES',
        payload: types.data
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export function postPokemon(payload) {
  return async function(dispatch) {
    try {
      let post = await axios.post("http://localhost:3001/pokemons", payload);
      return post;
    } catch (e) {
      console.log(e);
    }
  }
}

export function filterByType(payload) {
  return {
    type: 'FILTER_BY_TYPE',
    payload
  }
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}

export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
}

export function orderByAttack(payload) {
  return {
    type: 'ORDER_BY_ATTACK',
    payload
  }
}

// export function filterPokemonsBy
