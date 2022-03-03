import React, { Component } from 'react';
import SinglePieItem from './SinglePieItem';
import { FilterPieByFlavor } from './FilterMenus';
import { connect } from 'react-redux';
import { fetchPies } from '../store/allPies';
import { Link } from 'react-router-dom';

export class AllPies extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchPies();
  }

  render() {
    const pies = this.props.pies;

    return (
      <div className='all-pies-view'>
        <Link to='/addproduct'><button>ADD PRODUCT</button></Link>
        <FilterPieByFlavor />
        <div className='all-pies-item-container'>
          {[]
            .concat(pies)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((pie) => (
              <SinglePieItem key={pie.id} pie={pie} />
            ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    pies: state.pies,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPies: () => dispatch(fetchPies()),
  };
};

export default connect(mapState, mapDispatch)(AllPies);
