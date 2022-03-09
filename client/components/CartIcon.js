import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

import axios from 'axios';

class CartIcon extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      const { data } = await axios.get(`/api/cart`, {
        headers: { authorization: token },
      });
      localStorage.setItem('cart', JSON.stringify(data));
    }

    let localCart = eval(localStorage.getItem('cart'));
    if (!Array.isArray(localCart)) {
      localCart = [];
      localStorage.setItem('cart', '[]');
    }

    this.setState({ ...this.state, cart: localCart });
    this.props.fetchCart();
  }

  findTotalQuantity(cart) {
    if (cart.length > 0) {
      return cart.reduce((pv, cv) => pv + cv.quantity, 0);
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className='cart-qty'>
        <Link to='/cart'>
          <img src='/cart.png' className='cart-icon' />
        </Link>
        <p>{this.findTotalQuantity(this.props.cart)}</p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(CartIcon);
