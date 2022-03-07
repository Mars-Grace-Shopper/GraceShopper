import React from 'react';
import { Link } from 'react-router-dom';

export default function SinglePieItem(props) {
  return (
    <li>
      <button onClick={()=>props.remove(props.pie.id)}>X</button>
      <Link to={`/pies/${props.pie.id}`}>
        <img src={props.pie.thumbnailurl} />
      </Link>
      <p >{props.pie.name}</p>
      <div className='quantity'>
        <button
          type='button'
          className='decrement'
          onClick={()=>props.decrement(props.pie.id)}
        >
          -
        </button>
        <h3>{props.quantity}</h3>
        <button
          type='button'
          className='increment'
          onClick={()=>props.increment(props.pie.id)}
        >
          +
        </button>
      </div>
      <p className='pie-price'>${((props.pie.price)/ 100).toFixed(2)}</p>
    </li>
  );
}
