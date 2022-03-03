import React from 'react';
import { connect } from 'react-redux';

export class Cart extends React.Component {

  render() {
    return (
      <div id='cart'>
        <div>My Shopping Cart</div>
        <div>
          Pie #1
        </div>
      </div>
    );
  }
}

export default Cart;
