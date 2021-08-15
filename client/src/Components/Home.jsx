import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByName, orderByAttack } from '../Redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paged from './Paged.jsx';
import SearchBar from './SearchBar.jsx';

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector(state => state.pokemons);
  const [orden, setOrden] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(9);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paged = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch]);

function handleCreate(e) {
  e.preventDefault();
  dispatch(getPokemons());
};

function handleFilterCreated(e) {
  dispatch(filterCreated(e.target.value))
};

function handleSort(e) {
  e.preventDefault();
  dispatch(orderByName(e.target.value));
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`)
};

function handleAttack(e) {
  e.preventDefault();
  dispatch(orderByAttack(e.target.value));
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`)
}

  return (
    <div>
      <div>
        <img src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG9.png" alt="pokemon" />
      </div>
      <Link to="/pokemon"><button>Create Pokemon</button></Link>
      <button onClick={e => handleCreate(e)}>Reset Filters</button>
      <div>
        <select onChange={e => handleFilterCreated(e)}>
          <option value='All'>All</option>
          <option value='created'>Created</option>
          <option value='api'>Existent</option>
        </select>
        <select onChange={e => handleSort(e)}>
          <option value='nameAsc'>Name ↑</option>
          <option value='nameDesc'>Name ↓</option>
        </select>
        <select onChange={e => handleAttack(e)}>
          <option value='atkAsc'>Attack ↑</option>
          <option value='atkDesc'>Attack ↓</option>
        </select>
        <SearchBar />
        <Paged
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons.length}
        paged = {paged}
        />
        {
          currentPokemons && currentPokemons.map(e => {
            return (
              <Card
              name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
              type={e.types.map(type => type.name.charAt(0).toUpperCase() + type.name.slice(1) + " ")}
              image={e.image} />
            )
          })
        }
      </div>
    </div>
  )
}
