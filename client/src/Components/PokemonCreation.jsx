import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from '../Redux/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';

export default function PokemonCreation() {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);

  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    heigth: ""
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon());
  }

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <Link to="/home"><button>Home</button></Link>
      <h1>Create a Pokemon</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={e => handleChange(e)}
          />
        </div>
        <div>
          <label>Types:</label>
          <select>
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
          <label>Heigth:</label>
          <input
            type="number"
            value={input.heigth}
            name="heigth"
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
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
