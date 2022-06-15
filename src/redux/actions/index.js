// import axios from 'axios';
const baseUrl = "https://pi-pokemon-alhena-landsman.herokuapp.com"

export function getAllPokemons(){
    return async (dispatch) => fetch(baseUrl + "/pokemons") 
        .then(response => response.json()) 
        .then(data => dispatch({ type: 'GET_ALL_POKEMONS', payload: data }))
        .catch(e => console.log(e))
}

export function getAllTypes(){
    return async (dispatch) => fetch(baseUrl + "/types")
        .then(response => response.json())
        .then(data => dispatch({ type: 'GET_ALL_TYPES', payload: data }))
        .catch(e => console.log(e))
}

export function postPokemon(payload){
    return async () => {
        return fetch(baseUrl + "/pokemons", {
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
//         const response = await axios.post(baseUrl + "pokemons`, payload);
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
        return fetch(baseUrl + "/pokemons/"+id)
        .then(response => response.json())
        .then(data => dispatch({type: 'GET_POKEMON_DETAIL', payload: data})
        )
        .catch(e => console.log(e))
    }
}
export function deletePokemon(payload){
    return async function(dispatch){
        return fetch(baseUrl + "/clear/"+payload, {
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
        return fetch(baseUrl + "/pokemons?name="+name) 
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



