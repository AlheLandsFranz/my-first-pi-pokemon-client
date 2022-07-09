// import axios from 'axios';

export function getAllPokemons(){
    return async (dispatch) => fetch("http://localhost:3001/pokemons") 
        .then(response => response.json()) 
        .then(data => dispatch({ type: 'GET_ALL_POKEMONS', payload: data }))
        .catch(e => console.log(e))
}

export function getAllTypes(){
    return async (dispatch) => fetch("http://localhost:3001/types")
        .then(response => response.json())
        .then(data => dispatch({ type: 'GET_ALL_TYPES', payload: data }))
        .catch(e => console.log(e))
}

export function postPokemon(payload){
    return async () => {
        return fetch("http://localhost:3001/pokemons", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .catch(e => console.log(e))
    }
}
// CON AXIOS
// export function postPokemon(payload){
//     return async function(dispatch){
//         const response = await axios.post(`http://localhost:3001/pokemons`, payload);
//         return response;
//         }
// }
export function getPokemonByType(payload){
    return {
        type: 'GET_POKEMON_BY_TYPE',
        payload
    }
}

export function getPokemonDetail(id){
    return async function(dispatch){
        return fetch("http://localhost:3001/pokemons/"+id)
        .then(response => response.json())
        .then(data => dispatch({type: 'GET_POKEMON_DETAIL', payload: data})
        )
        .catch(e => console.log(e))
    }
}
export function deletePokemon(payload){
    return async function(dispatch){
        return fetch("http://localhost:3001/clear/"+payload, {
                method: 'DELETE'}) 
        .then(response => response.json())         
        .then( () => dispatch({type: 'DELETE_POKEMON'}))
        .catch(e => console.log(e))
    }
}


export function clearDetail(){
    return {
        type: 'CLEAR_DETAIL'
    }
}

export function searchByName(name){
    return async function(dispatch){
        return fetch("http://localhost:3001/pokemons?name="+name) 
        .then(response => response.json())         
        .then(data => dispatch({type: 'SEARCH_BY_NAME', payload: data})
        )
        .catch(e => console.log(e))
    }    
}

export function filterByCreation(payload){
    return {
        type: 'FILTER_BY_CREATION',
        payload
    }
}

export function order(payload){
    return {
        type: 'ORDER',
        payload
    }
}



