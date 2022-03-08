import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { SingleCheckoutCartItem } from "./SingleCartRow";
import AddressForm, { SetAddress } from "./AddressForm";
import { me } from "../store/auth";
import axios from "axios";

class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      setAddress: false,
      address: {
        customerName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: 0,
      },
    };
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSetAddress = this.handleSetAddress.bind(this);
  }
  findTotalQuantity(cart) {
    if (cart.length > 0) {
      return cart.reduce((pv, cv) => pv + cv.quantity, 0);
    } else {
      return 0;
    }
  }
  async componentDidMount() {
    await this.props.getAuth();
    if (this.props.auth.address)
      this.setState({ ...this.state, address: this.props.auth.address });
  }

  handleChange(event) {
    event.persist();
    event.preventDefault();
    const className = event.target.name;
    const value = event.target.value;
    if (className === "customerName")
      this.setState({
        ...this.state,
        address: { ...this.state.address, customerName: value },
      });
    if (className === "streetAddress")
      this.setState({
        ...this.state,
        address: { ...this.state.address, streetAddress: value },
      });
    if (className === "city")
      this.setState({
        ...this.state,
        address: { ...this.state.address, city: value },
      });
    if (className === "state")
      this.setState({
        ...this.state,
        address: { ...this.state.address, state: value },
      });
    if (className === "zipcode")
      this.setState({
        ...this.state,
        address: { ...this.state.address, zipcode: value },
      });
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleCheckOut(event) {
    event.preventDefault();
    let localCart = eval(localStorage.getItem("cart"));

    if (this.findTotalQuantity(localCart) < 1) window.alert("noooooooooo");
    else {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.put(
          `/api/cart/checkout`,
          { address: this.state.address },
          { headers: { authorization: token } }
        );

        console.log('PUT RESPONSE:', response)

        localStorage.setItem("cart", "[]");
        this.props.history.push({pathname: "/cart/checkout/confirmation", state: {orderId: response.data.orderId, orderDate: response.data.orderDate.slice(0, 10)}});
      } else {
        let address = this.state.address;
        await axios.post(`/api/cart/checkout`, {
          address: address,
          cart: localCart,
        });
        localStorage.setItem("cart", "[]");
        this.props.history.push("/cart/checkout/confirmation");
      }
    }
  }

  handleSetAddress() {
    this.setState({ ...this.state, setAddress: !this.state.setAddress });
  }
  render() {
    let address = <div></div>;
    if (!this.state.setAddress)
      address = (
        <AddressForm
          address={this.state.address}
          change={this.handleChange}
          setAddress={this.handleSetAddress}
        />
      );
    if (this.state.setAddress)
      address = (
        <SetAddress
          address={this.state.address}
          setAddress={this.handleSetAddress}
        />
      );
    let cart = eval(localStorage.getItem("cart"));
    return (
      <div className="form-box">
        <Link to="/cart">
          <button className="back-button">&#8249; BACK TO CART</button>
        </Link>
        <div className="field-box">
          <div className="left-field">{address}</div>

          <div className="right-field">
            <div>
              <div className="all-users-view">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>PIE</th>
                      <th>QUANTITY</th>
                      <th>PRICE</th>
                    </tr>
                    {cart.map((cartItem) => (
                      <SingleCheckoutCartItem
                        key={cartItem.pie.id}
                        pie={cartItem.pie}
                        quantity={cartItem.quantity}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <br></br>
              <center>
                <Link to="/cart/">
                  <button className="edit-submit">EDIT CART</button>
                </Link>
              </center>
            </div>
          </div>
        </div>
        <div>
          {this.state.setAddress ? (
            <button className="edit-submit" onClick={this.handleCheckOut}>
              PLACE ORDER
            </button>
          ) : (
            <h3 style={{color:'#3961e7'}}>CONFIRM ADDRESS BEFORE PLACING ORDER</h3>
          )}
        </div>
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
