import React from 'react';
// import { Link } from 'react-router-dom';
import style from './Card.module.css'
import img from './imgDefault1.png'



export default function Card({name, image, types}){

    return(
        !name
        ?   <div className={style.card}>
                 <h1>No se encontró el pokemón solicitado.</h1>
             </div>
          :  <div className={style.card}>
            <h2 className={style.title}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            { image ? <img src={image} alt="A este pokemón no le gustan las fotos" className=''/> 
             : <img src={img} alt='Sigue en su pokebola' className=''/>}
            {types?.map((t, i) => <h5 key={i} 
            className={style.types}>{ t.name 
            ? t.name.charAt(0).toUpperCase() + t.name.slice(1) : t.charAt(0).toUpperCase() + t.slice(1)}</h5>)}
        </div> 
    )
}