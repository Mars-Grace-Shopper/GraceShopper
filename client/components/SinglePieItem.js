import React from 'react';
import { Link } from 'react-router-dom';

export default function SinglePieItem(props) {
  const pie = props.pie;
  let price = props.pie.price
  price = (price / 100).toFixed(2);

  let deleteButton = <div></div>;
  if (props.isAdmin) {
    deleteButton = (
      <button onClick={() => props.delete(pie.id)}>X</button>
    );
  }
  return (
    <div className='single-pie-item'>
      <Link to={`/pies/${pie.id}`}>
        <img src={pie.thumbnailurl} />
      </Link>
      <p className='pie-name'>{pie.name}</p>
      <p className='pie-price'>${price}</p>
      {deleteButton}
    </div>
  );
}
