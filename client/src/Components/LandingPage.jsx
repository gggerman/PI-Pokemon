import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <Link to='/home' className="enterButton">
       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png" alt="pokeball" width="100" height="100"/>
       <h2>ENTER</h2>
      </Link>
    </div>
  )
}
