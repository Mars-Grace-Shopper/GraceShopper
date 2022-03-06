import React from "react";
import { connect } from "react-redux";
import SingleCartRow from "./SingleCartRow";

export class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
    this.heading = this.heading.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.findTotalQuantity = this.findTotalQuantity.bind(this)
    this.findTotalPrice = this.findTotalPrice.bind(this)
  }

  componentDidMount() {
    this.setState({ ...this.state, cart: eval(localStorage.getItem("cart")) });
  }

  heading() {
    if (this.state.cart.length === 0) {
      return <h3>Your cart is empty.</h3>;
    } else {
      return <h3>Items in your cart:</h3>;
    }
  }

  async handleRemove(id) {
    await this.setState({cart: this.state.cart.filter(i => i.pie.id  != id)})
    localStorage.setItem("cart", JSON.stringify(this.state.cart))
  }

  async handleIncrement(id) {
    console.log("Handleincrement: ", id);
    console.log('this.state.cart : ', this.state.cart)
    const tmpCart = this.state.cart
    for (let i = 0; i < tmpCart.length; ++i) {
      if (tmpCart[i]['pie']['id'] === id) {
        tmpCart[i]['quantity'] += 1;
      }
    }
    await this.setState({...this.state, cart: tmpCart})
    localStorage.setItem("cart", JSON.stringify(this.state.cart))
  }

  async handleDecrement(id) {
    console.log("HandleDecrement: ", id);
    const tmpCart = this.state.cart
    for (let i = 0; i < tmpCart.length; ++i) {
      if (tmpCart[i]['pie']['id'] === id) {
        if (tmpCart[i]['quantity'] > 1) {
          tmpCart[i]['quantity'] -= 1;
        }
      }
    }
    await this.setState({...this.state, cart: tmpCart})
    localStorage.setItem("cart", JSON.stringify(this.state.cart))
  }

  findTotalQuantity(cart) {
    // p is previousValue, c is currentValue
    if (cart.length > 0 ) {
      return cart.reduce((pv, cv) => pv + cv.quantity, 0)
      //let iv = 0;
      //return cart.reduce((pv, cv, idx) => {
        //const pq = pv.quantity;
        //const cq = cv.quantity;
        //console.log(`pv = ${pv}; pq = ${pq}; cv = ${cv}; cq = ${cq}; idx = ${idx}`)
        //return pv + cq
      //}, iv) 
    }
  }

  findTotalPrice(cart) {
    if (cart.length > 0 ) {
      return cart.reduce((pv, cv) => pv + (cv.pie.price * cv.quantity), 0)
      //let iv = 0;
      //return cart.reduce((pv, cv, idx) => {
        //const cp = cv.pie.price * cv.quantity;
        //console.log(`pv = ${pv}; cv = ${cv}; cp = ${cp}; idx = ${idx}`)
        //return pv + cp
      //}, iv) 
    } else {
      return 0;
    }
  }

  render() {
    console.log("ttt this: ", this);
    return (
      <div>
        <div id="cart">
          <div>{this.heading()}</div>
          <div>
            <ul>
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
            </ul>
          </div>
        </div> 
        <div id='totals'>
          <p>Total Quantity: {this.findTotalQuantity(this.state.cart)}</p>
          <p>Total Price: $ {(this.findTotalPrice(this.state.cart)/ 100).toFixed(2)}</p>
          <button> PROCEED TO CHECKOUT </button>
        </div>
      </div>
    );
  }
}

export default Cart;
