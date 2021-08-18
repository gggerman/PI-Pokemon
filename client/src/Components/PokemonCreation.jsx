import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../Redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar.jsx';
import './PokemonCreation.css';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "A name is required."
  }
  return errors;
}

export default function PokemonCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector(state => state.types);

  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: "",
    type: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    image: ""
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    console.log(input);
  }


  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value]
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    alert("¡Pokemon created!");
    setInput({
      name: "",
      type: [],
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      weight: "",
      height: "",
      image: ""
    });
    history.push('/home');
  }

  return (
    <div>
      <SearchBar />
      <div className="form">
        <h2>Create a Pokemon</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={e => handleChange(e)}
            />
          </div>
          {errors.name && (
            <span className="error">{errors.name}</span>
          )}
          <div>
            <label>Types:</label>
            <select onChange={e => handleSelect(e)}>
              {types.map(type => (
                <option value={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label>HP:</label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>Attack:</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>Defense:</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>Speed:</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={e => handleChange(e)}
            />
          </div>
          <div>{input.type.map(e => e.charAt(0).toUpperCase() + e.slice(1) + " ")}</div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}
