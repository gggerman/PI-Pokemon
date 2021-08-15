const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: []
}

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
      }
    case 'GET_NAME_POKEMONS':
      return {
        ...state,
        pokemons: action.payload
      }
    case 'GET_TYPES':
      return {
        ...state,
        types: action.payload
      }
    case 'GET_DETAILS':
      return {
        ...state,
        details: action.payload
      }
    case 'FILTER_CREATED':
      const createdFilter = action.payload === 'created' ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
      return {
        ...state,
        pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
      }
    case 'ORDER_BY_NAME':
      let sortedAsc = action.payload === 'nameAsc' ?
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
          pokemons: sortedAsc
        }
      case 'ORDER_BY_ATTACK':
         let sortedAtk = action.payload === 'atkAsc' ?
         state.pokemons.sort(function(a, b) {
           if (a.attack > b.attack) {
             return 1;
           }
           if (b.attack > a.attack) {
             return -1;
           }
           return 0;
         }) :
         state.pokemons.sort(function(a, b) {
           if (a.attack > b.attack) {
             return -1;
           }
           if (b.attack > a.attack) {
             return 1;
           }
           return 0;
         })
         return {
           ...state,
           pokemons: sortedAtk
         }
      default:
        return state;
  }
}

export default rootReducer;
