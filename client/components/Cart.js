import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleCartRow from './SingleCartRow';
import { fetchCart } from '../store/cart';

import axios from 'axios';

export class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.findTotalQuantity = this.findTotalQuantity.bind(this);
    this.findTotalPrice = this.findTotalPrice.bind(this);
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
  }

  async handleRemove(id) {
    await this.setState({
      cart: this.state.cart.filter((i) => i.pie.id != id),
    });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));

    const token = localStorage.getItem('token');
    if (token) {
      await axios.delete(`/api/cart/cartitem/` + id, {
        headers: { authorization: token },
      });
    }
    this.props.fetchCart();
  }

  async handleIncrement(id) {
    let newQty;

    const token = localStorage.getItem('token');
    const tmpCart = this.state.cart;
    for (let i = 0; i < tmpCart.length; ++i) {
      if (tmpCart[i]['pie']['id'] === id) {
        tmpCart[i]['quantity'] += 1;
        newQty = tmpCart[i]['quantity'];
      }
    }

    await this.setState({ ...this.state, cart: tmpCart });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));

    if (token) {
      await axios.put(
        `/api/cart/cartitem`,
        { quantity: newQty, pieId: id },
        { headers: { authorization: token } }
      );
    }
    this.props.fetchCart();
  }

  async handleDecrement(id) {
    let newQty;
    const token = localStorage.getItem('token');

    const tmpCart = this.state.cart;
    for (let i = 0; i < tmpCart.length; ++i) {
      if (tmpCart[i]['pie']['id'] === id) {
        if (tmpCart[i]['quantity'] > 1) {
          tmpCart[i]['quantity'] -= 1;
          newQty = tmpCart[i]['quantity'];
        }
      }
    }

    await this.setState({ ...this.state, cart: tmpCart });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));

    if (token) {
      await axios.put(
        `/api/cart/cartitem`,
        { quantity: newQty, pieId: id },
        { headers: { authorization: token } }
      );
    }
    this.props.fetchCart();
  }

  findTotalQuantity(cart) {
    if (cart.length > 0) {
      return cart.reduce((pv, cv) => pv + cv.quantity, 0);
    } else {
      return 0;
    }
  }

  findTotalPrice(cart) {
    if (cart.length > 0) {
      return cart.reduce((pv, cv) => pv + cv.pie.price * cv.quantity, 0);
    } else {
      return 0;
    }
  }

  render() {
    const {
      handleRemove,
      handleIncrement,
      handleDecrement,
      findTotalPrice,
      findTotalQuantity,
    } = this;

    let empty = <div></div>;
    if (this.state.cart.length === 0)
      empty = (
        <p className='empty'>
          Your cart is empty. <Link to='/pies'>Add something!</Link>
        </p>
      );

    let checkoutButton = (
      <Link to={{ pathname: '/checkout', state: { cart: this.state.cart } }}>
        <button onClick={this.handleCheckOut}> PROCEED TO CHECKOUT </button>
      </Link>
    );
    if (this.state.cart.length === 0)
      checkoutButton = <button disabled>PROCEED TO CHECKOUT</button>;

    return (
      <div className='cart-box'>
        <div className='cart'>
          <h1>My Shopping Cart</h1>
          <div className='cart-header'>
            <div style={{ width: '25px' }}></div>

            <h4 style={{ width: '150px', textAlign: 'center' }}>PRODUCT</h4>
            <div style={{ width: '200px' }}></div>
            <h4 style={{ width: '140px', textAlign: 'center' }}>QUANTITY</h4>
            <h4>PRICE</h4>
          </div>
          <hr className='navbar-hr' />
          {empty}
          {[].concat(this.state.cart).map((cartItem, idx) => (
            <SingleCartRow
              key={idx}
              pie={cartItem.pie}
              quantity={cartItem.quantity}
              remove={handleRemove}
              increment={handleIncrement}
              decrement={handleDecrement}
            />
          ))}
        </div>
        <div className='total'>
          <div className='total-header'>
            <h4>QUANTITY</h4>
            <h4>TOTAL</h4>
          </div>
          <hr className='navbar-hr' />
          <div className='total-price'>
            <p>{findTotalQuantity(this.state.cart)}</p>
            <p style={{ color: '#3961e7' }}>
              ${(findTotalPrice(this.state.cart) / 100).toFixed(2)}
            </p>
          </div>
          {checkoutButton}
        </div>
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

export default connect(mapState, mapDispatch)(Cart);
