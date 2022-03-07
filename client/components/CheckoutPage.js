import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { SingleCheckoutCartItem } from "./SingleCartRow";
import AddressForm from "./AddressForm";
import {me} from "../store/auth"
import axios from 'axios';

class CheckoutPage extends Component {
    constructor() {
        super();
        this.state = {
            address : {
                customerName : '',
                streetAddress : '',
                city : '',
                state : '',
                zipcode : 0,
            }

        }
        this.handleCheckOut= this.handleCheckOut.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount(){
        // await this.props.getAuth();
        // if(this.props.auth.address) this.setState({...this.state, address: this.props.auth.address})
    }

    handleChange(event) {
        event.persist();
        event.preventDefault();
        const className = event.target.name;
        const value = event.target.value;
        if (className === 'customerName') this.setState({ ...this.state, address:{...this.state.address, customerName: value }});
        if (className === 'streetAddress') this.setState({ ...this.state, address:{...this.state.address, streetAddress: value }});
        if (className === 'city') this.setState({ ...this.state, address:{...this.state.address, city: value }});
        if (className === 'state') this.setState({ ...this.state, address:{...this.state.address, state: value }});
        if (className === 'zipcode') this.setState({ ...this.state, address:{...this.state.address, zipcode: value }});
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    async handleCheckOut(event) {
        event.preventDefault();
        const token = localStorage.getItem('token')
        if (token) {
          await axios.put(`/api/cart/checkout`, {}, {headers:{authorization: token}})
          this.props.history.push("/")
        } else {
          let localCart = eval(localStorage.getItem("cart"));
          let address = this.state.address
          console.log('rrrrrrrrrrrr', address)
          await axios.post(`/api/cart/checkout`, {address: address, cart: localCart})
          localStorage.setItem('cart', '[]')
          this.props.history.push("/")
        }
      }
  render() {
    const cart = this.props.location.state.cart;
    console.log(cart)
    console.log('=========',this.state.address);
    return (
      <div className="form-box">
        <AddressForm address={this.state.address} change={this.handleChange}/>
        {cart.map((cartItem) => (
          <SingleCheckoutCartItem
            key={cartItem.pie.id}
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

const mapState = (state) => {
    return {
      auth: state.auth,
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getAuth: () => dispatch(me()),
    };
  };
  
  export default connect(mapState, mapDispatch)(CheckoutPage);
