import React from 'react'
import { Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx'
import Home from './Components/Home.jsx';
import PokemonCreation from './Components/PokemonCreation.jsx';
import Details from './Components/Details.jsx';
import SearchBar from './Components/SearchBar.jsx'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route path='/creation' component={PokemonCreation}/>
        <Route path='/home/:idPokemon' component={Details}/>
      </Switch>
    </div>
  );
}

export default App;
