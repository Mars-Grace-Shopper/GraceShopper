import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { fetchSinglePie } from '../store/singlePie';

import EditPie from './EditPie';
import AddToCart from './AddToCart';

class SinglePieView extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
      quantity: 1,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchSinglePie(this.props.match.params.id);
    if(this.props.auth.type === 'admin') this.setState({...this.state, isAdmin: true})
  
  }

  increment() {
    this.setState({ ...this.state, quantity: this.state.quantity + 1})
  }

  decrement() {
    if (this.state.quantity > 0) {
      this.setState({ ...this.state, quantity: this.state.quantity - 1})
    }
  }

  handleClick() {
    this.setState({ ...this.state, editPieView: !this.state.editPieView });
    this.props.fetchSinglePie(this.props.match.params.id);
  }

  render() {
    const { increment, decrement, handleClick } = this;
    const pie = this.props.pie;
    let editButton = <div></div>
    if(this.state.isAdmin) editButton = <Link to='/editpie'><button className='edit-button'>EDIT</button></Link>
    
      return (
        <div className='single-pie'>
          <div className='single-pie-links'>
            <Link to='/pies'><button className='back-button'>&#8249; BACK</button></Link>
            {editButton}
          </div>
          <div className='single-pie-view-container'>
            <div className='img-box'>
              <img className='single-view-img' src={pie.thumbnailurl} />
              <h4>TYPE: <span style={{ color: "#3961e7" }}>{pie.type}</span></h4>
            </div>
            <div className='single-view-text-container'>
              <div className='name-price'>
                <h2>{pie.name}</h2>
                <h2>${pie.price}</h2>
              </div>
              <h4>{pie.countryOrigin}</h4>
              <p>{pie.description}</p>
              <div className='quantity-box'>
                <div className='quantity'>
                  <button
                    type='button'
                    className='decrement'
                    onClick={decrement}
                  >
                    -
                  </button>
                  <h3>{this.state.quantity}</h3>
                  <button
                    type='button'
                    className='increment'
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
                <AddToCart pie={pie} quantity={this.state.quantity} className='add-to-cart'/>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

const mapState = (state) => {
  return {
    pie: state.pie,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSinglePie: (id) => dispatch(fetchSinglePie(id)),
  };
};

export default connect(mapState, mapDispatch)(SinglePieView);
