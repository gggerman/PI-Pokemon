import React from 'react';

export default function Card({ name, image, type}) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="img not found" />
      <h5>{type}</h5>
    </div>
  )
}
