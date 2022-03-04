import React from 'react';
import { Link } from 'react-router-dom';

//single pies that show up in featured and on all pies view
export default function SinglePieItem(props) {
  console.log(props.pie);
  return (
    <div className='single-pie-item'>
      <Link to={`/pies/${props.pie.id}`}>
        <img src={props.pie.thumbnailurl} />
      </Link>
      <p className='pie-name'>{props.pie.name}</p>
      <p className='pie-price'>${props.pie.price}</p>
      <button>X</button>
    </div>
  );
}
