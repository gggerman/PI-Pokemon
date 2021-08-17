import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNamePokemons } from '../Redux/actions';
import './SearchBar.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePokemons(name));
    setName("");
  }

  return (
    <div className="navBar">
      <Link to="/home">
        <div className="logo">
          <img src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG9.png" alt="pokemon" width="25%" height="25%"/>
        </div>
      </Link>
      <Link to="/creation"><button className="createButton">Create Pokemon</button></Link>
      <div className="searchBar">
        <input
          onChange={e => handleInputChange(e)}
          type="text"
          placeholder="Search..."
        />
        <button className="searchButton" onClick={e => handleSubmit(e)} type="submit">Search</button>
      </div>
    </div>
  )
}
