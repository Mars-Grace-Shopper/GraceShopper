import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SingleCheckoutCartItem } from "./SingleCartRow";

export default class CheckoutPage extends Component {
    constructor() {
        this.handleCheckOut= this.handleCheckOut.bind(this)
    }
    async handleCheckOut() {
        const token = localStorage.getItem('token')
        if (token) {
          await axios.put(`/api/cart/checkout`, {}, {headers:{authorization: token}})
          this.props.history.push("/")
        } else {
          let localCart = eval(localStorage.getItem("cart"));
          await axios.post(`/api/cart/checkout`, localCart)
          localStorage.setItem('cart', '[]')
          this.props.history.push("/")
        }
      }
  render() {
    const spanStyle = {
      color: "red",
      fontSize: "12px",
      letterSpacing: "0.5px",
      fontWeight: "normal",
    };
    const required = <span style={spanStyle}>*Required</span>;
    const cart = props.location.state.cart;
    return (
      <div className="form-box">
        <form className="add-edit-form">
          <div className="field-box">
            {/* <div className='title-box'>
              <div className='title' style={{ padding: '0px' }}>
                <h2>Shipping Address</h2>
              </div>
            </div> */}
            <div className="left-field">
              <label htmlFor="customerName">NAME {required}</label>
              <input
                // onChange={}
                name="customerName"
                pattern="^[A-Za-z ]*$"
                required
                title="Please enter a valid name."
              />
              <br />
              <br />
              <label htmlFor="streetAddress">STREET ADDRESS {required}</label>
              <input
                // onChange={}
                name="streetAddress"
                pattern="^[A-Za-z0-9]*$"
                required
                title="Please enter a valid street address."
              />
            </div>
            <br />
            <br />
            <div className="right-field">
              <div className="price-qty">
                <div className="city">
                  <label htmlFor="city">CITY</label>
                  <input
                    //  onChange={}
                    name="streetAddress"
                    pattern="^[A-Za-z]*$"
                    required
                    title="Please enter a valid street address."
                  />
                </div>
                <br />
                <br />
                <div className="qty">
                  <label htmlFor="state">STATE</label>
                  <input
                    pattern="^[A-Za-z]*$"
                    // onChange={}
                    name="state"
                  />
                </div>
                <br />
                <br />
                <div className="qty">
                  <label htmlFor="zipcode">ZIPCODE</label>
                  <input
                    pattern="^[0-9]*$"
                    // onChange={}
                    name="zipcode"
                  />
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
          <div className="edit-buttons">
            <Link to="/pies">
              <button className="back-button">&#8249; BACK</button>
            </Link>
            <button type="submit" className="edit-submit">
              SUBMIT
            </button>
          </div>
        </form>
        {cart.map((cartItem) => (
          <SingleCheckoutCartItem
            key={cartItem.id}
            pie={cartItem.pie}
            quantity={cartItem.quantity}
          />
        ))}
        <Link to="/cart/">EDIT CART</Link>
        <button onClick={this.handleCheckOut}>PLACE ORDER</button>
      </div>
    );
  }
}
