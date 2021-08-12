import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <div>
        <img src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG9.png" alt="pokemon" />
      </div>
      <Link to='/home'>
       <button>Enter</button>
      </Link>
    </div>
  )
}
