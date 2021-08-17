import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../Redux/actions/index.js';
import { useEffect } from 'react';
import SearchBar from './SearchBar.jsx';

export default function Details(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.idPokemon));
  }, [dispatch, props.match.params.idPokemon]);

  const myPokemon = useSelector(state => state.details);

  return (
    <div>
      <SearchBar />
      {
        myPokemon.length ?
        <div>
          <h1>{myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h1>
          <img src={myPokemon[0].image} alt="not found"/>
          <h3>{myPokemon[0].types.map(type => type.name.charAt(0).toUpperCase() + type.name.slice(1) + " ")}</h3>
          <p>#{myPokemon[0].id}</p>
          <p>HP: {myPokemon[0].hp}</p>
          <p>Attack: {myPokemon[0].attack}</p>
          <p>Defense: {myPokemon[0].defense}</p>
          <p>Speed: {myPokemon[0].speed}</p>
          <p>Weight: {myPokemon[0].weight}</p>
          <p>Height: {myPokemon[0].height}</p>
        </div> : <p>Loading...</p>
      }
      <Link to='/home'>
        <button>Home</button>
      </Link>
    </div>
  )
}
