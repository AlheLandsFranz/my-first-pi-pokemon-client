import React, { Fragment, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { filterByCreation, getAllPokemons, getAllTypes, getPokemonByType, order } from "../../redux/actions";
import  Card from '../CardPokemon/Card'
import Paginated from "./Paginated";
import SearchBar from "../Search/SearchBar";
import style from './Home.module.css'
import styles from './Paginated.module.css'
import gif from './resources/loading2.gif'
import error from './resources/error.png'

export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const type = useSelector(state => state.type)
   
    const [, setOrden] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage] = useState(12)

    let lastPoke = currentPage * pokemonsPerPage  
    let firstPoke = lastPoke - pokemonsPerPage
    let currentPoke = allPokemons.length > 2 ? allPokemons.slice(firstPoke, lastPoke) : allPokemons 

    
    const prevPage = (e) => {
        e.preventDefault();
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
       else{
           alert("No hay más páginas previas")
       }
    };
    const nextPage = (e) => {
        e.preventDefault();
   
        if(Math.ceil(allPokemons.length / 12) > currentPage){
        setCurrentPage(currentPage + 1);
    }
    else{
        alert("No hay más páginas posteriores")
    }
      }

     const paginated = (pageNumber) => {
         setCurrentPage(pageNumber);
     }

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, [dispatch])

    function handleFilterByType(e){
        dispatch(getPokemonByType(e.target.value))
    }
    function handleFilterByCreation(e){
        dispatch(filterByCreation(e.target.value))
        
    }
    function handleOrder(e){
        e.preventDefault()
        dispatch(order(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleRefresh(_e){
        dispatch(getAllPokemons())
    }


    return(
        <div className={style.home}>
            <div className={style.navBar}>
            <div className={style.butAgain}>
            
            <Link to='/'><button>
             <span className={style.transition}></span>
              <span className={style.label}>Go Back</span></button></Link>

            <Link to='/pokemon'><button>
            <span className={style.transition}></span>
              <span className={style.label}>Pokemon Create</span></button></Link>

            <button onClick={(e) => handleRefresh(e)}><span className={style.transition}></span>
                <span className={style.label}>Refresh</span></button>

            <a href="https://www.linkedin.com/in/alhena-landsman-28ba5a18a/">
                <button className={style.linkedin}><span className={style.label}>Linkedin</span></button></a>

            </div>
        <div className={style.filtrados}>
            
            <select value='orden' onChange={(e) => handleOrder(e)}>
            <option value='orden' key="">Order by</option>
                <option value= 'asc'>A-Z</option>
                <option value= 'desc'>Z-A</option>
                <option value= 'masFuerza'>+Strength</option>
                <option value= 'menosFuerza'>-Strength</option> 
            </select>
            
            <select value='types' onChange={(e) => handleFilterByType(e)}>
                <option value="types" key="types">Type</option>
                {type.length && type.map( t => ( 
                    <option value={t.name} key={t.name} >{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>))}
            </select>

            <select value='all' onChange={(e) => handleFilterByCreation(e)}>
                <option value= 'all'>Everyone</option>
                <option value= 'exist'>Existed</option>
                <option value= 'created'>Created</option>
            </select>

        <div className={style.searchBar}>
                <SearchBar/>
                </div>
            </div>
    </div>

        <div className={style.cards}>
            {
            currentPoke.length === 1 
              ? currentPoke[0].name 
                ? (<Fragment key={currentPoke[0].id}>
                    <Link to={"/pokemons/"+currentPoke[0].id}>
                        <Card name={currentPoke[0].name} 
                        image={currentPoke[0].image} 
                        types={currentPoke[0].types ? 
                            currentPoke[0].types 
                            : currentPoke[0].type} 
                        key={currentPoke[0].id}/>
                    </Link>
                    </Fragment>) 
                : <div className={style.cardsError}>
                    <img src={error} alt='Error'/>
                   <h1 className={style.error}>Ups, no se encontro tu pokemon. Intenta crearlo.</h1>
                    <Link to='/pokemon'><button>Pokemon Create</button></Link>
                  </div>
            : currentPoke.length > 1
             ? currentPoke.map( poke => {
               return( 
                <Fragment key={poke.id}>
                   <Link to={"/pokemons/"+poke.id}>
                   <Card name={poke.name} image={poke.image} types={poke.types ? poke.types : poke.type} key={poke.id}/>
                   </Link>
                </Fragment>
                )
              }
            )
            : <img src={gif} className={style.gif} alt="Loading" /> 
            }      
        </div>
            
            <ul className={styles.paginContainer}>
                <li>
                    <button onClick={(e) => prevPage(e)}>Prev</button></li>
            <Paginated
            pokemonsPerPage={ pokemonsPerPage }
            allPokemons={ allPokemons.length }
            paginated={ paginated }
            />
            <li>
                <button onClick={(e) => nextPage(e)}>Next</button></li>
            </ul>

        </div>
    )
}
