import React from 'react';
import { Link } from 'react-router-dom';
import './Paged.css'

export default function Paged({ pokemonsPerPage, allPokemons, paged}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <span className="paged">
        { pageNumbers && pageNumbers.map(number => (
          <span className="number" key={number}>
            <Link className="link">
            <div onClick={() => paged(number)}>{number}</div>
            </Link>
          </span>
        ))}
      </span>
    </div>
  )
}
