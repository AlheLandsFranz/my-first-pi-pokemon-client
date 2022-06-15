import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { searchByName } from '../../redux/actions';
import style from './SearchBar.module.css'


export default function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    
    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchByName(name.toLowerCase()))
        setName("")
    }

    return(
        <div className={style.search}>
            <input className={style.searchInput} type='text' placeholder='Busca tu pokemon' onChange={(e) => handleInputChange(e)}
            value={name}/>
            <button className={style.searchBtn} type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )

}