import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, deletePokemon, getPokemonDetail } from '../../redux/actions';
import img from './../CardPokemon/imgDefault1.png'
import style from './PokemonDetail.module.css'
import gif from './../Home/resources/Pan.gif'


export default function PokemonDetail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
 
useEffect(() => {
        dispatch( getPokemonDetail( id) );    
        return( () => dispatch( clearDetail() ) );
}, [dispatch, id])

function handleDelete(id){
    dispatch(deletePokemon(id))
    history.push('/home')
};
    const myPokemon = useSelector( state => state.pokemonDetail );
console.log(myPokemon[0], "mypokemon")

    return(
        !myPokemon[0] 
        ? <div className={style.detail}> 
            <img src={gif} className={style.gif} alt="Loading"/>  
         </div>
        : <div className={style.detail}>
            <h1>Bio de {myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h1>
            <div className={style.pokeDetail}>
                <h1>{myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h1>
                { myPokemon[0].createdInDb &&
            <button onClick={() => handleDelete(myPokemon[0].id)}>X</button> } 
                { myPokemon[0].image ? <img src={myPokemon[0].image} alt='Parece que a este pokemón no le gustan las fotos'/>
                  :<img src={img} alt='Parece que a este pokemón no le gustan las fotos'/> 
                }
                {
                myPokemon[0].type?.map( ( t, i ) => (<p key={i}>{t.charAt(0).toUpperCase() + t.slice(1)}</p>))
                }
                <p className={style.attributes}>Datos estadísticos:</p>
                <p>Vida: {myPokemon[0].hp}</p>
                <p>Fuerza de ataque: {myPokemon[0].attack}</p>
                <p>Defensa: {myPokemon[0].defense}</p>
                <p>Velocidad: {myPokemon[0].speed}</p>
                <p className={style.bio}>Datos biograficos:</p>
                <p>Altura: {myPokemon[0].height}</p>
                <p>Peso: {myPokemon[0].weight}</p>
                <p>Su ID: {myPokemon[0].id}</p>
            </div>
        <Link to='/home'><button className={style.butHome}>Volver</button></Link>
        </div>
    );
}


// [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// [ ] Número de Pokemon (id)
// [ ] Estadísticas (vida, fuerza, defensa, velocidad)
// [ ] Altura y peso