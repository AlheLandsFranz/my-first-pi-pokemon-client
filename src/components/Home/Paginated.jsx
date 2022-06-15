import React from 'react';
import styles from './Paginated.module.css';

export default function Paginated({pokemonsPerPage, allPokemons, paginated}){
const pageNumbers = []
let pages = Math.ceil(allPokemons/pokemonsPerPage)
let pag = 1
    while(pages >= pag){
         pageNumbers.push(pag)
          pag++
}
    return(
        <nav>
                {
                    pageNumbers?.map( num => (
                        <li className={styles.paginated} key={num}>
                            <button className={styles.butPag}
                            onClick={() => paginated(num)}>{ num }</button>
                        </li>
                        )
                    )
                }
        </nav>
    )
}

