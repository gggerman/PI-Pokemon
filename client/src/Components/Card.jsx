import React from 'react';
import './Card.css';

export default function Card({ id, name, image, type}) {
  return (
    <div className="card">
      <h3>#{id + " " + name}</h3>
      <img src={image} alt="img not found" width="200px" height="200px"/>
      <h5>{type}</h5>
    </div>
  )
}
