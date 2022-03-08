//import React from 'react';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';



export default class SingleOrder extends Component {
//export default function SingleOrder(props) {
//export default function SingleOrder(props) {

  // let price = props.pie.price
  // price = (price / 100).toFixed(2);

  constructor () {
    super()
    this.state = {
      order: []
    }
  }


  async componentDidMount() {
    const token = window.localStorage.getItem('token')
    const {data} = await axios.get('/api/orders/' + this.props.location.state.orderId, {headers: {authorization: token}});
    await this.setState({ order: data})
  }

    findTotalPrice(cart) {
    if (cart.length > 0) {
      return cart.reduce((pv, cv) => pv + cv.pie.price * cv.quantity, 0);
    } else {
      return 0;
    }
  }


  render() {

  const orderDate = this.props.location.state.orderDate;
  const orderId = this.props.location.state.orderId;
  const orderItems = [].concat(this.props.location.state.orderItems)

  const style = { color: '#3961e7' };
  console.log('SO this', this)
  return (
    <div className='single-order'>
      <div className='single-order-header'>
        <h3>
          <span style={style}>ORDER # </span> {orderId}
        </h3>
        <h3>{orderDate}</h3>
      </div>
      <div className='single-order-table'>
        <div className='order-table'>
          <h4>NAME</h4>
          <h4>PRICE</h4>
        </div>
        <hr className='navbar-hr' />

        {/* map in here */}
        {this.state.order.map((item, idx) => {
         return (
        <div className='order-info' key={idx}>
          <p>
            <span style={style}>x{item.quantity}</span> {item.pie.name}
          </p>
          <p>${(item.pie.price / 100).toFixed(2)}</p>
        </div>
            )})}
        <hr style={{margin: '0px 30px'}}/>
        {/* map in here */}

        <div className='order-total'>
          <p>
            <span style={style}>Total</span>: ${(this.findTotalPrice(this.state.order) / 100).toFixed(2)}
          </p>
        </div>
      </div>

      <Link to='/userhome'>
        <button className='back-button'>‹ BACK</button>
      </Link>
    </div>
  );
}
}
