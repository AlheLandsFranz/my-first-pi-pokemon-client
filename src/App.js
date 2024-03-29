// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  LandingPage  from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import PokemonDetail from './components/Detail/PokemonDetail'
import PokemonCreate from './components/Form/PokemonCreate'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/pokemon' component={PokemonCreate}/>
        <Route path='/pokemons/:id' component={PokemonDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
