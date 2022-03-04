import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { username, type } = props;
  console.log(props);

  return (
    <div className='logged-in-userhome'>
      <div className='logged-in-header'>
        <div className='bio'>
        <h3>Welcome, {username}!</h3>
        <h4>Status: {type}</h4>
        </div>
        <button type='button'>EDIT ACCOUNT</button>
      </div>
      <div className='past-orders'>
        <h3>PAST ORDERS</h3>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    type: state.auth.type,
  };
};

export default connect(mapState)(UserHome);
