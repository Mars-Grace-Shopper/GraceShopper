import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSinglePie } from '../store/singlePie';
import EditPie from './EditPie';

class SinglePieView extends Component {
  constructor() {
    super();
    this.state = {
      editPieView: false,
      quantity: 1,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchSinglePie(this.props.match.params.id);
  }

  increment() {}

  decrement() {}

  handleClick() {
    this.setState({ ...this.state, editPieView: !this.state.editPieView });
    this.props.fetchSinglePie(this.props.match.params.id);
  }

  render() {
    const { increment, decrement, handleClick } = this;
    const pie = this.props.pie;

    if (this.state.editPieView === false) {
      return (
        <div className='single-pie-view-container'>
          <div className='back-and-img'>
            <Link to='/pies'>Back</Link>
            <br />
            <img
              className='single-view-img'
              src={this.props.pie.thumbnailurl}
            />
          </div>

          <div className='single-view-text-container'>
            <h1>{pie.name}</h1>
            <h2>${pie.price}</h2>
            <h2>{pie.origin}</h2>
            <h3>{pie.description}</h3>
            <div className='quantity'>
              <button type='button' className='decrement' onClick={decrement}>
                -
              </button>
              <h3>{this.state.quantity}</h3>
              <button type='button' className='increment' onClick={increment}>
                +
              </button>
            </div>
            <button type='button' className='add-to-cart'>
              ADD TO CART
            </button>
          </div>
        </div>
      );
    }
    return <EditPie pie={this.props.pie} click={handleClick} />;
  }
}

const mapState = (state) => {
  return {
    pie: state.pie,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSinglePie: (id) => dispatch(fetchSinglePie(id)),
  };
};

export default connect(mapState, mapDispatch)(SinglePieView);
