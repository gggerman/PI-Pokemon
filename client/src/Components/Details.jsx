import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../Redux/actions/index.js';
import { useEffect } from 'react';
import SearchBar from './SearchBar.jsx';
import './Details.css';

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
        <div className="detailsCard">
          <div className="imageCard">
            <h2>#{myPokemon[0].id}</h2>
            <h2>{myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h2>
            <img src={myPokemon[0].image} alt="not found" width="350px" height="350px"/>
            <h3>{myPokemon[0].types.map(type => type.name.charAt(0).toUpperCase() + type.name.slice(1) + " ")}</h3>
          </div>
          <div>
            <h3>HP: {myPokemon[0].hp}</h3>
            <h3>Attack: {myPokemon[0].attack}</h3>
            <h3>Defense: {myPokemon[0].defense}</h3>
          </div>
          <div>
            <h3>Speed: {myPokemon[0].speed}</h3>
            <h3>Weight: {myPokemon[0].weight}</h3>
            <h3>Height: {myPokemon[0].height}</h3>
          </div>
        </div> : <img src="https://i.gifer.com/4OKl.gif" alt="pokemon"/>
      }
    </div>
  )
}
