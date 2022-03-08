import React from 'react';
import { Link } from 'react-router-dom';

//single pies that show up in featured and on all pies view
export default function SinglePieRow(props) {
//  let deleteButton = <div></div>
//  if(props.isAdmin) {
//    deleteButton = <button onClick={()=>props.delete(props.pie.id)}>X</button>
//  }
  return (
        
    <tr >
       
        <td>
           
                <img src={props.pie.thumbnailurl} className='pie-table-img'/>
      
        </td>
        
        <td>{props.pie.id}</td>
        <td>{props.pie.name}</td>
        <td>{props.pie.countryOrigin}</td>
        <td>{props.pie.type}</td>
        <td className='pie-description'>{props.pie.description}</td>
        <td>{props.pie.price}</td>
        <td>{props.pie.stockQuantity}</td>
        <td>{props.pie.countryCode}</td>
    </tr>
    // <Link to={`/pies/${pie.id}/editpie`}><button className='edit-button'>EDIT</button></Link>
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
