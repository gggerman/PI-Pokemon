import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../Redux/actions';

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
  }

  return (
    <div>
      <input
        onChange={e => handleInputChange(e)}
        type="text"
        placeholder="Search..."
      />
      <button onClick={e => handleSubmit(e)} type="submit">Search</button>
    </div>
  )
}
