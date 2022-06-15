import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'


export default function LandingPage(){
    return(
           <div className={styles.container}>
        <div className={styles.all}>
            <div className={styles.pokebola}></div>
        <Link to='/home'>
            <button className={styles.buttonLanding}></button>
        </Link>
        <h1>Ingresa al Mundo<br/>
            Pokemón</h1>
        </div>
  </div>

    )
}