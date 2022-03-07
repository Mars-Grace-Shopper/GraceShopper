import React from 'react';
import { Link } from 'react-router-dom';

//single pies that show up in featured and on all pies view
export default function SingleUserRow(props) {
//  let deleteButton = <div></div>
//  if(props.isAdmin) {
//    deleteButton = <button onClick={()=>props.delete(props.pie.id)}>X</button>
//  }



  console.log('rrrrrrrr', props)
  return (
    
      <tr>
        <td>{props.user.id}</td>
        <td>{props.user.username}</td>
        <td>{props.user.email}</td>
        <td>{props.user.type}</td>
      </tr>
    
    // <li>
    //   <button onClick={()=>props.remove(props.pie.id)}>X</button>
    //   <Link to={`/pies/${props.pie.id}`}>
    //     <img src={props.pie.thumbnailurl} />
    //   </Link>
    //   <p >{props.pie.name}</p>
    //   <div className='quantity'>
    //     <button
    //       type='button'
    //       className='decrement'
    //       onClick={()=>props.decrement(props.pie.id)}
    //     >
    //       -
    //     </button>
    //     <h3>{props.quantity}</h3>
    //     <button
    //       type='button'
    //       className='increment'
    //       onClick={()=>props.increment(props.pie.id)}
    //     >
    //       +
    //     </button>
    //   </div>
    //   <p className='pie-price'>${((props.pie.price)/ 100).toFixed(2)}</p>
    // </li>
  );
}
