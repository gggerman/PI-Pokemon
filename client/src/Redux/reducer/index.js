const initialState = {
  pokemons: [],
  allPokemons: []
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
      }
    case 'FILTER_CREATED':
      const allPokemons = state.allPokemons;
      const createdFilter = action.payload === 'created' ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
      return {
        ...state,
        pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
      }
    case 'ORDER_BY_NAME':
      let sortedArr = action.payload === 'asc' ?
        state.pokemons.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.pokemons.sort(function(a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        })
        return {
          ...state,
          pokemons: sortedArr
        }
      default:
        return state;
  }
}

export default rootReducer;
