import React from 'react';
import { Link } from 'react-router-dom';

//single pies that show up in featured and on all pies view
export default function SinglePieItem(props) {
  let deleteButton = <div></div>
  if(props.isAdmin) {
    deleteButton = <button onClick={()=>props.delete(props.pie.id)}>X</button>
  }
  return (
    <div className='single-pie-item'>
      <Link to={`/pies/${props.pie.id}`}>
        <img src={props.pie.thumbnailurl} />
      </Link>
      <p className='pie-name'>{props.pie.name}</p>
      <p className='pie-price'>${props.pie.price}</p>
      {deleteButton}
    </div>
  );
}
