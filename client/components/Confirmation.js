import React from 'react';
import { Link } from 'react-router-dom';


// order.updatedAt.slice(0, 10)


export default function Confirmation(props) {
  console.log('CONF props:', props)

  const handleVO = () => {
        this.props.history.push({pathname: "/order/" + props.location.state.orderId, state: {orderId: props.location.state.orderId, orderDate: props.location.state.orderDate}});
  }

  return (
    <div className='confirmation'>
      <div className='confirmation-msg'>
        <h1>THANK YOU!</h1>
        <p>Your order has been placed.</p>
        <p>


          Order # <Link to={{pathname:'/order/' + props.location.state.orderId, state: {orderId: props.location.state.orderId, orderDate: props.location.state.orderDate} }} ><span style={{ color: '#3961e7' }}>{props.location.state.orderId}</span></Link>
        </p>
      </div>
      <Link to={{pathname:'/order', state: {orderId: props.location.state.orderId, orderDate: props.location.state.orderDate} }} >
        <button>VIEW ORDER</button>
      </Link>
      <Link to='/pies'>
        <button>CONTINUE SHOPPING</button>
      </Link>
    </div>
  );
}
