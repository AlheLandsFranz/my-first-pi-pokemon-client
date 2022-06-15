import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getAllTypes } from '../../redux/actions';
import style from './PokemonCreate.module.css'

function validate(input){
    let error = {}

    if(!input.name){
        error.name = 'Debes asignar un nombre a tu pokemon'
    } else if(input.name !== input.name.toLowerCase()){
        error.name = 'El nombre de tu pokemón debe ser en minúscula.'
    } else if(input.name.length > 25){
        error.name = 'El nombre de tu pokemón no puede exceder a 25 caracteres.'
    } else if(!input.attack ){ 
        error.attack = 'Debes agregarle una fuerza de ataque a tu pokemon'
    } else if(input.attack < 1){
        error.attack = 'La fuerza de tu pokemón debe ser mayor a 0'
    } else if(!input.defense ){ 
        error.defense = 'Debes agregarle defensa a tu pokemon'
    } else if(input.defense < 1){
        error.defense = 'La capacidad de defenderse de tu pokemon debe ser mayor a 0'
    } else if(!input.speed ){ 
        error.speed = 'Debes agregarle velocidad a tu pokemon'
    } else if(input.speed < 1){
        error.speed = 'La velocidad de tu pokemon debe ser mayor a 0'
    } else if(!input.height ){ 
        error.height = 'Debes agregarle altura a tu pokemon'
    } else if(input.height < 1){
        error.height = 'Tu pokemon no puede medir menos de 1'
    } else if(!input.weight ){ 
        error.weight = 'Debes agregarle peso a tu pokemon'
    } else if(input.weight < 1){
        error.weight = 'Tu pokemon no puede pesar menos de 1'
    } else if(input.image !== "" && !(/.jpg|.jpeg|.png/i).test(input.image)){ 
        error.image = 'Tu imagen debe tener una extensión jpg, jpeg o png.'
    } else if(input.types.length === 0 || input.types.length > 5){ 
        error.types = 'Debes seleccionar entre uno a cinco tipos como máximo para tu pokemon.'
    } 
    return error;
}

export default function PokemonCreate(){
const dispatch = useDispatch()
    // const navigate = useNavigate() version react-router-dom 6
const history = useHistory();
const type = useSelector(state => state.type)
const [error, setError] = useState({})
const [input, setInput] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0, 
        weight: 0,
        types: []
})

useEffect(() => {
        dispatch(getAllTypes())
}, [dispatch]);

const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
}

const handleSelect = (e) => {   
        
    if(!input.types.includes(e.target.value)){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })        
            setError(validate({
                ...input,
                [e.target.name]: e.target.value
            }))  
    }
}

const handleDelete = (type) => {
        setInput({
            ...input,
            types: input.types.filter(t => t !== type)
        });
        setError(validate({
            ...input,
            types: [...input.types]
        }))
}
useEffect(() => {
        setError(
          validate({
            ...input,
          })
        );
}, [input, dispatch]);

const handleSubmit = (e) => {
        e.preventDefault()
        if(Object.keys(error).length || !input.name || !input.types.length || input.types.length > 5){ alert("Debes validar los campos solicitados.")}
        else{
            dispatch(postPokemon(input))
            alert("Tu Pokemón se ha creado con éxito")
            setInput({
                name: "",
                image: "",
                hp: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                height: 0, 
                weight: 0,
                types: []
            })
            console.log(history)
            history.push('/home')
        }
}

    return(
        <div className={style.allForm}>
           <div className={style.head}><Link to='/Home'><button className={style.home}>Home</button></Link>
            <h1>CREA TU POKEMON</h1></div> 
            <form>
                <div className={style.allInput}>
                <label>Nombre:</label>
                    <input type='text' 
                    value={input.name} 
                     name='name'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                    { error.name &&
                    (<p className={style.error}>{error.name}</p>)}
                </div><div className={style.numbers}>
                <div className={style.allInput}>
                <label>Vida:</label>
                    <input type='range'
                    min='1'
                    max='100' 
                    value={input.hp} 
                     name='hp'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                </div><div className={style.allInput}>
                <label>Ataque:</label>
                    <input type='number' 
                    value={input.attack} 
                     name='attack'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                    { error.attack &&
                    (<p className={style.error}>{error.attack}</p>)}
                </div><div className={style.allInput}>
                <label>Defensa:</label>
                    <input type='number' 
                    value={input.defense} 
                     name='defense'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                    { error.defense &&
                    (<p className={style.error}>{error.defense}</p>)}
                </div><div className={style.allInput}>
                <label>Velocidad:</label>
                    <input type='number' 
                    value={input.speed} 
                     name='speed'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                    { error.speed &&
                    (<p className={style.error}>{error.speed}</p>)}
                </div><div className={style.allInput}>
                <label>Altura:</label>
                    <input type='number' 
                    value={input.height} 
                     name='height'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                    { error.height &&
                    (<p className={style.error}>{error.height}</p>)}
                </div><div className={style.allInput}>
                <label>Peso:</label>
                    <input type='number' 
                    value={input.weight} 
                     name='weight'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                    { error.weight &&
                    (<p className={style.error}>{error.weight}</p>)}
                </div></div>
                <div className={style.allInput}>
                <label>Su imagen:</label>
                    <input type='url' 
                    value={input.image} 
                     name='image'
                    onChange={(e) => handleInputChange(e)}
                    className={style.textInput}/>
                    { error.image &&
                    (<p className={style.error}>{error.image}</p>)}
                </div>
                <select className={style.types} onChange={(e) => handleSelect(e)}><option className={style.typesOptionTop} disabled>Tipos de pokemón</option>
                {type?.map( t => ( 
                    <option className={style.typesOptions} value={t.name} key={t.id}>{ t.name.charAt(0).toUpperCase() + t.name.slice(1) }</option>
                ))}
            </select>
            {input.types.map( (ty, i) => <div className={style.tipesCharacter} key={i}>
                <p>{ ty.charAt(0).toUpperCase() + ty.slice(1)}</p>
                <button className={style.buttonDelete} onClick={() => handleDelete(ty)}>X</button>
                </div>
            )}{ error.types &&
                (<p className={style.error}>{error.types}</p>)}
            <button type='submit' 
            className={style.submitButton}
            onClick={(e) => handleSubmit(e)}><span>Crear Pokemon</span></button>
            </form>
        </div>
    )
}