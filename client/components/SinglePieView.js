import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSinglePie } from '../store/singlePie';
import EditPie from './EditPie';
import AddToCart from './AddToCart';
import ClipLoader from 'react-spinners/ClipLoader';

class SinglePieView extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      quantity: 1,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.props.fetchSinglePie(this.props.match.params.id).then(() => {
      this.setState({ ...this.state, isLoading: false });
    });
  }

  increment() {
    this.setState({ ...this.state, quantity: this.state.quantity + 1 });
  }

  decrement() {
    if (this.state.quantity > 1) {
      this.setState({ ...this.state, quantity: this.state.quantity - 1 });
    }
  }

  render() {
    const { increment, decrement } = this;
    const pie = this.props.pie;
    let price = pie.price;
    price = Number(price / 100).toFixed(2);

    let editButton = <div></div>;
    if (this.props.auth.type === 'admin')
      editButton = (
        <Link to={`/pies/${pie.id}/editpie`}>
          <button className='edit-button'>EDIT</button>
        </Link>
      );

    let component = this.state.isLoading ? (
      <div className='loading-page'>
        <div className='spinner'>
          <ClipLoader color={'#1B69E7'} size={60} />
        </div>
      </div>
    ) : (
      <div className='single-pie'>
        <div className='single-pie-links'>
          <Link to='/pies'>
            <button className='back-button'>&#8249; BACK</button>
          </Link>
          {editButton}
        </div>
        <div className='single-pie-view-container'>
          <div className='img-box'>
            <img className='single-view-img' src={pie.thumbnailurl} />
            <h4>
              TYPE: <span style={{ color: '#3961e7' }}>{pie.type}</span>
            </h4>
          </div>
          <div className='single-view-text-container'>
            <div className='name-price'>
              <h2>{pie.name}</h2>
              <h2>${price}</h2>
            </div>
            <h4>{pie.countryOrigin}</h4>
            <p>{pie.description}</p>
            <div className='quantity-box'>
              <div className='quantity'>
                <button type='button' className='decrement' onClick={decrement}>
                  -
                </button>
                <h3>{this.state.quantity}</h3>
                <button type='button' className='increment' onClick={increment}>
                  +
                </button>
              </div>
              <AddToCart
                pie={pie}
                quantity={this.state.quantity}
                history={this.props.history}
              />
            </div>
          </div>
        </div>
      </div>
    );

    return component;
  }
}

const mapState = (state) => {
  return {
    pie: state.pie,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSinglePie: (id) => dispatch(fetchSinglePie(id)),
  };
};

export default connect(mapState, mapDispatch)(SinglePieView);
