import React from 'react';
import { Link } from 'react-router-dom';

export default function SinglePieRow(props) {
  const pie = props.pie;

  return (
    <tr>
      <td>
        <img src={pie.thumbnailurl} className='pie-table-img' />
      </td>
      <td>{pie.id}</td>
      <td>{pie.name}</td>
      <td>{pie.countryOrigin}</td>
      <td>{pie.type}</td>
      <td>{pie.description}</td>
      <td>{pie.price}</td>
      <td>{pie.stockQuantity}</td>
      <td>{pie.countryCode}</td>
    </tr>
  );
}
