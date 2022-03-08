import React from 'react';
import { connect } from 'react-redux';
import {fetchCart} from '../store/cart'

import axios from 'axios';

class AddToCart extends React.Component {
    constructor() {
        super();
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    async handleAddItem() {
        const token = localStorage.getItem('token')
        let localCart = eval(localStorage.getItem("cart"));
        let newQty;

        if (!Array.isArray(localCart)) {
            localCart = []
        }

    // if this pie is in the local cart
    if (localCart.filter((e) => e.pie.id === this.props.pie.id).length > 0) {
      // iterate over the cart and find this pie and increment the quantity
      for (let i = 0; i < localCart.length; ++i) {
        if (localCart[i]['pie']['id'] === this.props.pie.id) {
          localCart[i]['quantity'] += this.props.quantity;
          newQty = localCart[i]['quantity'];
        }
      }
 
      // if logged in, update quantity in database
      if (token) {
        await axios.put(`/api/cart/cartitem`, {quantity: newQty, pieId: this.props.pie.id}, {headers:{authorization: token}})
      }

    } else {
      // else add this pie to the localcart
      localCart.push({ quantity: this.props.quantity, pie: this.props.pie });
      // if logged in, create a new cart item in the database
      if (token) {
        await axios.post(`/api/cart/cartitem`, {quantity: this.props.quantity, pieId: this.props.pie.id}, {headers:{authorization: token}})
      }
    }

    localStorage.setItem('cart', JSON.stringify(localCart));
    this.props.fetchCart()
    //this.props.history.push("/cart")

  }    

  render() {
    return (
      <button className='add-to-cart' onClick={this.handleAddItem}>
        ADD TO CART
      </button>
    );
  }
}

//export default AddToCart;


const mapState = (state) => {
  return {
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(AddToCart);

