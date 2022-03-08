import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminToolbar from './AdminToolbar';

import axios from 'axios';

//export const UserHome = (props) => {
export class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      pastOrders: [],
      username: '',
      accountType: '',
    };
    this.displayOrders = this.displayOrders.bind(this);
    this.adminToolbar = this.adminToolbar.bind(this);
  }

  //const { username, type } = props;

  async componentDidMount() {
    console.log('ssss', this);
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders', {
      headers: { authorization: token },
    });
    console.log('response', response);
    //fsr (let i of response.data) {

    //}

    await this.setState({
      ...this.state,
      username: this.props.username,
      accountType: this.props.type,
      pastOrders: response.data,
    });
  }

  adminToolbar() {
    if (this.state.accountType === 'admin') {
      return <AdminToolbar />;
    } else {
      return <div style={{ width: '225px' }}></div>;
    }
  }

  displayOrders(orders) {
    if (orders.length < 1) {
      return (
        <div className='empty'>
          No orders yet. <Link to='/pies'>Make one!</Link>
        </div>
      );
    } else {
      console.log('DO', orders);
      //return ('yyyyyyyyyyy')

      //return (1 + 1)
      return orders.map((order, idx) => {
        return (
          <div className='orders' key={idx}>
            <Link
              to={{
                pathname: '/order',
                state: {
                  orderItems: order.cartitems,
                  orderId: order.id,
                  orderDate: order.updatedAt.slice(0, 10),
                },
              }}
            >
              <p style={{ color: '#3961e7' }}>{order.id}</p>
            </Link>
            <p> {order.updatedAt.slice(0, 10)}</p>
            <p> $99.99 </p>
          </div>
        );
      });

      //orders.map((order) => {
      //  return (<p> {order.id} </p>)
    }
  }

  /*
  will only need the DATE when a order is created
  >> 2022-03-04 19:06:05.541-05 ==> 2022-03-04

  let date = order.createdAt;
  date = String(order).slice(0, 10);
  */

  render() {
    return (
      <div className='logged-in-userhome'>
        {this.adminToolbar()}
        <div className='logged-in-header'>
          <h1>Welcome, {this.state.username}!</h1>
          <h3>{this.state.accountType}</h3>

          <Link to={`/users/${this.props.id}/editAccountForm`}><button>EDIT ACCOUNT INFO</button></Link>

          <div className='past-orders'>
            <h2>Past Orders</h2>
            <div className='order-table'>
              <h4>ORDER #</h4>
              <h4>DATE</h4>
              <h4>TOTAL</h4>
            </div>
            <hr className='navbar-hr' />

            {this.displayOrders(this.state.pastOrders)}
          </div>

        </div>
        <div style={{ width: '225px' }}></div>
        {/* have to protect this ID */}
        

      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
    id: state.auth.id,
    type: state.auth.type,
  };
};

export default connect(mapState)(UserHome);
