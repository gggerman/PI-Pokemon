import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterCreated, filterByType, orderByName, orderByAttack } from '../Redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paged from './Paged.jsx';
import SearchBar from './SearchBar.jsx';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector(state => state.pokemons);
  const allTypes = useSelector(state => state.types);
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
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

function handleCreate(e) {
  e.preventDefault();
  dispatch(getPokemons());
};

function handleFilterCreated(e) {
  dispatch(filterCreated(e.target.value))
  setCurrentPage(1);
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

function handleType(e) {
  console.log(e.target.value)
  dispatch(filterByType(e.target.value));
  setCurrentPage(1);
}

  return (
    <div>
      <SearchBar />
      <div>
        <div className="filters">
          <span className="filtersLetters"> Created/Existent: </span>
          <select onChange={e => handleFilterCreated(e)}>
            <option value='All'>All</option>
            <option value='created'>Created</option>
            <option value='api'>Existent</option>
          </select>
          <span className="filtersLetters"> Sort By: </span>
          <select onChange={e => handleSort(e)}>
            <option value='nameAsc'>Name ↑</option>
            <option value='nameDesc'>Name ↓</option>
          </select>
          <select onChange={e => handleAttack(e)}>
            <option value='atkAsc'>Attack ↑</option>
            <option value='atkDesc'>Attack ↓</option>
          </select>
          <span className="filtersLetters"> Type: </span>
          <select onChange={e => handleType(e)}>
          <option value='All'>All</option>
          {
            allTypes && allTypes.map(e => {
              return (
                <option value={e.name}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</option>
              )
            })
          }
          </select>
          <button className="resetButton" onClick={e => handleCreate(e)}>Reset Filters</button>
        </div>
        <Paged className="pagedTop"
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons.length}
        paged = {paged}
        />
        <div className="cards">
        {
          currentPokemons.length ?
          currentPokemons.map(e => {
            return (
              <div>
                <Link to={"/home/" + e.id} className="card">
                  <Card
                  id={e.id}
                  name={e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                  type={e.types.map(type => type.name.charAt(0).toUpperCase() + type.name.slice(1) + " ")}
                  image={e.image}
                  key={e.id} />
                </Link>
              </div>
            )
          }) : <img src="https://i.gifer.com/4OKl.gif" alt="pokemon"/>
        }
        </div>
        <Paged
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons.length}
        paged = {paged}
        />
      </div>
    </div>
  )
}
