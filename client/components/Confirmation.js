import React from 'react';
import { Link } from 'react-router-dom';

export default function Confirmation() {
  return (
    <div className='confirmation'>
      <div className='confirmation-msg'>
        <h1>THANK YOU!</h1>
        <p>Your order has been placed.</p>
        <p>
          Order # <span style={{ color: '#3961e7' }}>[number]</span>
        </p>
      </div>
      <button>VIEW ORDER</button>
      <Link to='/pies'>
        <button>CONTINUE SHOPPING</button>
      </Link>
    </div>
  );
}
