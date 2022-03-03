import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { username, type } = props;
  console.log(props)

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <h4>Status: {type}</h4>
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

export default connect(mapState)(UserHome)
