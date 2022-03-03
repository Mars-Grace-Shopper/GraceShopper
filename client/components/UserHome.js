import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { firstName } = props;
  const { type } = props;

  return (
    <div>
      <h3>Welcome back, {firstName}!</h3>
      <div>Status: {type} </div>
      {/* <Link><button> Edit Account </button></Link> */}
      <div>Order History: </div>
      {/* Need to map out past orders here */}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    type: state.auth.type
  };
};

export default connect(mapState)(UserHome)
