import React from 'react';
import { Link } from 'react-router-dom';

export default function SingleOrder(props) {

  // let price = props.pie.price
  // price = (price / 100).toFixed(2);

  const style = { color: '#3961e7' };

  return (
    <div className='single-order'>
      <div className='single-order-header'>
        <h3>
          <span style={style}>ORDER #</span> 2
        </h3>
        <h3>03/22/2022</h3>
      </div>
      <div className='single-order-table'>
        <div className='order-table'>
          <h4>NAME</h4>
          <h4>PRICE</h4>
        </div>
        <hr className='navbar-hr' />

        {/* map in here */}
        <div className='order-info'>
          <p>
            <span style={style}>x3</span> Product Name
          </p>
          <p>$27.00</p>
        </div>
        <hr style={{margin: '0px 30px 0px 30px'}}/>
        {/* map in here */}

        <div className='order-total'>
          <p>
            <span style={style}>Total</span>: $45.00
          </p>
        </div>
      </div>

      <Link to='/userhome'>
        <button className='back-button'>‹ BACK</button>
      </Link>
    </div>
  );
}
