import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminToolbar from './AdminToolbar';

export const UserHome = (props) => {
  const { username, type } = props;

  let adminToolbar = <div></div>
  if(type === 'admin') adminToolbar = <AdminToolbar/>


  /*
  will only need the DATE when a order is created
  >> 2022-03-04 19:06:05.541-05 ==> 2022-03-04

  let date = order.createdAt;
  date = String(order).slice(0, 10);
  */

  return (
    <div className='logged-in-userhome'>
      <div className='logged-in-header'>
          <h1>Welcome, {username}!</h1>
          <h3>{type}</h3>
      </div>
      <div className='past-orders'>
        <h2>PAST ORDERS</h2>
        <div className='order-table'>
          <h4>ORDER #</h4>
          <h4>DATE</h4>
          <h4>TOTAL</h4>
        </div>
        <hr className='navbar-hr' />

        {/* ------ return if NO orders */}
        <div className='no-orders'>No orders yet. <Link to='/pies'>Make one!</Link></div>
        {/* ------ return if  NO orders */}

        {/* ------ return if orders */}
        
        {/* <div className='orders'>
          <p style={{ color: '#3961e7' }}>2</p>
          <p>12/22/2022</p>
          <p>$45.00</p>
        </div> */}
        {/* ------ return if orders */}
      </div>
      {adminToolbar}
      <button>EDIT ACCOUNT INFO</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    type: state.auth.type,
  };
};

export default connect(mapState)(UserHome);
