import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleCartRow from './SingleCartRow';

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

  componentDidMount() {
    this.setState({ ...this.state, cart: eval(localStorage.getItem('cart')) });
  }

  async handleRemove(id) {
    await this.setState({
      cart: this.state.cart.filter((i) => i.pie.id != id),
    });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  async handleIncrement(id) {
    const tmpCart = this.state.cart;
    for (let i = 0; i < tmpCart.length; ++i) {
      if (tmpCart[i]['pie']['id'] === id) {
        tmpCart[i]['quantity'] += 1;
      }
    }
    await this.setState({ ...this.state, cart: tmpCart });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  async handleDecrement(id) {
    const tmpCart = this.state.cart;
    for (let i = 0; i < tmpCart.length; ++i) {
      if (tmpCart[i]['pie']['id'] === id) {
        if (tmpCart[i]['quantity'] > 1) {
          tmpCart[i]['quantity'] -= 1;
        }
      }
    }
    await this.setState({ ...this.state, cart: tmpCart });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  findTotalQuantity(cart) {
    if (cart.length > 0) {
      return cart.reduce((pv, cv) => pv + cv.quantity, 0);
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
    let empty = <div></div>;
    if (this.state.cart.length === 0)
      empty = (
        <p className='empty'>
          Your cart is empty. <Link to='/pies'>Add something!</Link>
        </p>
      );

    return (
      <div className='cart-box'>
        <div className='cart'>
          <h1>My Shopping Cart</h1>
          <div></div>
          <div className='cart-header'>
            <h4>PRODUCT</h4>
            <h4>QUANTITY</h4>
            <h4>PRICE</h4>
          </div>
          <hr className='navbar-hr' />
          {empty}
          {[].concat(this.state.cart).map((cartItem, idx) => (
            <SingleCartRow
              key={idx}
              pie={cartItem.pie}
              quantity={cartItem.quantity}
              remove={this.handleRemove}
              increment={this.handleIncrement}
              decrement={this.handleDecrement}
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
            <p>{this.findTotalQuantity(this.state.cart)}</p>
            <p style={{ color: '#3961e7' }}>
              ${(this.findTotalPrice(this.state.cart) / 100).toFixed(2)}
            </p>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    );
  }
}

export default Cart;
