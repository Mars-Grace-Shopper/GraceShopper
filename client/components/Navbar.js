import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className='header'>
      <h1>
        <Link to='/'>iHOPie</Link>
      </h1>
      <h2>INTERNATIONAL HOUSE OF PIE</h2>
    </div>
    <nav id="navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to='/'>HOME</Link>
          <Link to='/pies'>PIES</Link>
          <Link to='/userhome'>ACCOUNT</Link>
          <a href='#' onClick={handleClick}>
            LOGOUT
          </a>
          {/* <input type='text' placeholder='Search..' /> */}

          {/* will change the link for cart later */}
          <Link to='/cart'><img src='/cart.png' /></Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to='/'>HOME</Link>
          <Link to='/pies'>PIES</Link>
          <Link to='/login'>LOGIN</Link>
          <Link to='/signup'>SIGN UP</Link>
          {/* <input type='text' placeholder='Search..' /> */}

          {/* will change the link for cart later */}
          <Link to='/cart'><img src='/cart.png' /></Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
