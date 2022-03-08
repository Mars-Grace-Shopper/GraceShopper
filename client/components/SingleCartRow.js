import React from 'react';
import { Link } from 'react-router-dom';

export default function SinglePieItem(props) {
  return (
    <div className='cart-item'>
      <button
        onClick={() => props.remove(props.pie.id)}
        className='remove-button'
      >
        X
      </button>
      <Link to={`/pies/${props.pie.id}`}>
        <img src={props.pie.thumbnailurl} />
      </Link>
      <p>{props.pie.name}</p>
      <div className='quantity'>
        <button
          type='button'
          className='decrement'
          onClick={() => props.decrement(props.pie.id)}
        >
          -
        </button>
        <h3>{props.quantity}</h3>
        <button
          type='button'
          className='increment'
          onClick={() => props.increment(props.pie.id)}
        >
          +
        </button>
      </div>
      <p style={{ color: '#3961e7' }}>${(props.pie.price / 100).toFixed(2)}</p>
    </div>
  );
}


//Single cart row for checkout page
export function SingleCheckoutCartItem(props) {
  return (
    <tr>
      <td> <Link to={`/pies/${props.pie.id}`}>
      <p>{props.pie.name}</p>
      </Link></td>
      <td><p style={{ color: '#3961e7' }}>${(props.pie.price / 100).toFixed(2)}</p></td>
      <td><h3>{props.quantity}</h3></td>
    </tr>
  );
}
