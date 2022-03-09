import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import CartIcon from './CartIcon';
import { fetchCart } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className='header'>
      <h1>
        <Link to='/'>iHOPie</Link>
      </h1>
      <h2>INTERNATIONAL HOUSE OF PIE</h2>
    </div>
    <nav id='navbar'>
      <div className='nav-invisible'></div>
      {isLoggedIn ? (
        <div className='links'>
          {/* The navbar will show these links after you log in */}
          <Link to='/'>HOME</Link>
          <Link to='/pies'>PIES</Link>
          <Link to='/userhome'>ACCOUNT</Link>
          <a href='#' onClick={handleClick}>
            LOGOUT
          </a>
        </div>
      ) : (
        <div className='links'>
          {/* The navbar will show these links before you log in */}
          <Link to='/'>HOME</Link>
          <Link to='/pies'>PIES</Link>
          <Link to='/login'>LOGIN</Link>
        </div>
      )}
      <CartIcon />
    </nav>
    <hr className='navbar-hr' />
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      localStorage.removeItem('token');
      localStorage.setItem('cart', '[]');
      dispatch(fetchCart());
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
