import React from 'react';

class AddToCart extends React.Component {
    constructor() {
        super();
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    handleAddItem () {
        let localCart = eval(localStorage.getItem("cart"));

        if (!Array.isArray(localCart)) {
            localCart = []
        }

    // if this pie is in the local cart
    if (localCart.filter((e) => e.pie.id === this.props.pie.id).length > 0) {
      // iterate over the cart and find this pie and increment the quantity
      for (let i = 0; i < localCart.length; ++i) {
        if (localCart[i]['pie']['id'] === this.props.pie.id) {
          localCart[i]['quantity'] += this.props.quantity;
        }
      }
    } else {
      // else add this pie to the localcart
      localCart.push({ quantity: this.props.quantity, pie: this.props.pie });
    }

    localStorage.setItem('cart', JSON.stringify(localCart));
    // this.props.history.push("/cart")
  }    

  render() {
    return (
      <button className='add-to-cart' onClick={this.handleAddItem}>
        ADD TO CART
      </button>
    );
  }
}

export default AddToCart;
