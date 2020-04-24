import React from 'react';
import './Card.css';


/** Card is a 'dumb' presentation component used in CardTable */

function Card({ src }) {
  return (
    <img src={src}></img>
  )
}

export default Card;