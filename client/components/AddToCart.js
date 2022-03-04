import React from 'react';
import { Link } from 'react-router-dom';

class AddToCart extends React.Component {
    constructor() {
        super();
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    handleAddItem () {
        console.log("HIIII", this)

        let localCart = eval(localStorage.getItem("cart"));

        if (!Array.isArray(localCart)) {
            localCart = []
        }

        // if this pie is in the local cart
        if (localCart.filter(e => e.pie.id === this.props.pie.id).length > 0) {

          // iterate over the cart and find this pie and increment the quantity
          for (let i = 0; i < localCart.length; ++i) {
            if (localCart[i]['pie']['id'] === this.props.pie.id) {
              localCart[i]['quantity'] += this.props.quantity;
            }
          }

        } else { // else add this pie to the localcart
          localCart.push({quantity: this.props.quantity, pie: this.props.pie});
        }

        localStorage.setItem("cart", JSON.stringify(localCart));
    }

    render () {
       
        return (
            <button onClick={this.handleAddItem} className='add-to-cart'> <Link to={`/cart`}>ADD TO CART </Link> </button>
        )
    }

}


export default AddToCart
