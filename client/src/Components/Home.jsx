import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByName } from '../Redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paged from './Paged.jsx';

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
}

function handleFilterCreated(e) {
  dispatch(filterCreated(e.target.value))
}

function handleSort(e) {
  e.preventDefault();
  dispatch(orderByName(e.target.value));
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`)
}

  return (
    <div>
      <Link to="/pokemons">Create Pokemon</Link>
      <h1>Pokemon</h1>
      <button onClick={e => handleCreate(e)}>Load Pokemons Again</button>
      <div>
        <select onChange={e => handleSort(e)}>
          <option value='asc'>Ascendent</option>
          <option value='desc'>Descendent</option>
        </select>
        <select onChange={e => handleFilterCreated(e)}>
          <option value='All'>All</option>
          <option value='created'>Created</option>
          <option value='api'>Existent</option>
        </select>
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
              type={e.types.map((type, index) => type.name.charAt(0).toUpperCase() + type.name.slice(1) + " ")}
              image={e.image} />
            )
          })
        }
      </div>
    </div>
  )
}
