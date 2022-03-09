import React, { Component } from 'react';
import SinglePieItem from './SinglePieItem';
import { connect } from 'react-redux';
import { fetchPies } from '../store/allPies';
import { filterPies } from '../store/allPies';
import { Link } from 'react-router-dom';
import { deletePie } from '../store/allPies';
import ClipLoader from 'react-spinners/ClipLoader';

export class AllPies extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      filter: '',
      listOfPies: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSetFilter = this.handleSetFilter.bind(this);
  }

  componentDidMount() {
    this.props.fetchPies().then(() => {
      this.setState({ ...this.state, listOfPies: this.props.pies });
      this.setState({ ...this.state, isLoading: false });
    });
  }

  handleDelete(id) {
    this.props.deletePie(id);
  }

  async handleSetFilter(event) {
    await this.setState({ ...this.state, filter: event.target.value });
    this.props.filterPies(this.state.filter);
  }

  renderFilteredPies() {
    console.log('rFP this', this)

    let replace;
    if (this.state.filter === 'alphabetical') {
      replace = '';
    } else {
      replace = this.state.filter;
    }

    let newRegex = new RegExp(`${replace}`, 'i');
    return []
      .concat(this.props.pies)
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((pie) => newRegex.test(pie.type))
      .map((pie) => (
        <SinglePieItem
          key={pie.id}
          pie={pie}
          isAdmin={this.props.auth.type}
          delete={this.handleDelete}
        />
      ));
  }

  render() {
    let addPie = <div></div>;
    if (this.props.auth.type === 'admin')
      addPie = (
        <Link to='/addpie'>
          <button>ADD PRODUCT</button>
        </Link>
      );

    let component = this.state.isLoading ? (
      <div className='loading-page'>
        <div className='spinner'>
          <ClipLoader color={'#1B69E7'} size={60} />
        </div>
      </div>
    ) : (
      <div className='all-pies-view'>
        <div className='all-pies-menu'>
          <div className='filter-search'>
            <div className='filter'>
              <select
                defaultValue='alphabetical'
                onChange={this.handleSetFilter}
              >
                <option value='alphabetical'>Sort by: Alphabetical</option>
                <option value='sweet'>Sort by: Sweet</option>
                <option value='savory'>Sort by: Savory</option>
              </select>
            </div>
            <input type='text' placeholder='Search for a pie...' />
          </div>
          {addPie}
        </div>
        <div className='all-pies-item-container'>
          {this.renderFilteredPies()}
          <div className='invisible-pie-div'></div>
        </div>
      </div>
    );

    return component;
  }
}

const mapState = (state) => {
  return {
    pies: state.pies,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    filterPies: (filter) => dispatch(fetchPies(filter)),
    fetchPies: () => dispatch(fetchPies()),
    deletePie: (id) => dispatch(deletePie(id)),
  };
};

export default connect(mapState, mapDispatch)(AllPies);
