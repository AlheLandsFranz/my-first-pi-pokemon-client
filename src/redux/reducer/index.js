const initialState = {
  pokemons: [],
  allPokemons: [],
  pokemonDetail: [],
  type: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };
        case 'GET_ALL_TYPES': 
            return {
                ...state,
                type: action.payload
            };
        case 'POST_POKEMON': 
            return {
                ...state  
            };

        case 'SEARCH_BY_NAME':
            return {
                ...state,
                pokemons: [action.payload]
            };

        case 'GET_POKEMON_BY_TYPE':
            let allPoke = state.allPokemons
            let pokemonFiltered = action.payload === "types" ? allPoke
            : allPoke?.filter( poke =>  poke.types.includes(action.payload))
            return{
                ...state,
                pokemons: pokemonFiltered
            };

        case 'GET_POKEMON_DETAIL':
            return {
                ...state,
                pokemonDetail: [action.payload]
            };
        case 'DELETE_POKEMON':
            return{
                ...state
            };
        case 'CLEAR_DETAIL':
            return{
                ...state,
                pokemonDetail: []
            };
        case 'FILTER_BY_CREATION':
            let poke = state.allPokemons
            let pokeFiltered = action.payload === "created" ? poke.filter(p => p.createdInDb) : poke.filter(p => !p.createdInDb)
            return {
                ...state,
                pokemons: action.payload === "all" ? poke : pokeFiltered
            };

        case 'ORDER':
            console.log("allPokemons", state.allPokemons)
            let pokeName = state.pokemons
            let pokeByName = action.payload === 'orden' 
                ? pokeName.sort((a, b) => {
                    if (a.id < b.id) {
                         return -1;
                       }
                       if (a.id > b.id) {
                         return 1;
                       }
                       return 0;
                    }) 
                : action.payload === 'asc' 
                ? pokeName.sort((a, b) => {
                   if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                      }
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                      }
                      return 0;
                }) 
                :  action.payload === 'desc'
                 ? pokeName.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                         return -1;
                       }
                       if (a.name.toLowerCase() < b.name.toLowerCase()) {
                         return 1;
                       }
                       return 0;
                 })
                 : action.payload === 'menosFuerza'
                 ? pokeName.sort((a, b) => a.attack - b.attack)
                 : pokeName.sort((a, b) => b.attack - a.attack)
            return {
                ...state,
                pokemon: pokeByName
            };
        default:
            return state;
    };
};

export default rootReducer;
