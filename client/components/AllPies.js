import React, { Component } from 'react';
import SinglePieItem from './SinglePieItem';
import { FilterMenu } from './FilterMenu';
import { connect } from 'react-redux';
import { fetchPies } from '../store/allPies';
import { Link } from 'react-router-dom';
import { deletePie } from '../store/allPies';

export class AllPies extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchPies();
    if(this.props.auth.type === 'admin') this.setState({...this.state, isAdmin: true})
  }

  handleDelete(id){
    this.props.deletePie(id);
  }

  render() {
    const pies = this.props.pies;
    let addPie = <div></div>
    if(this.state.isAdmin === true) addPie = <Link to='/addpie'><button>ADD PRODUCT</button></Link>
    return (
      <div className='all-pies-view'>
        <div className='all-pies-menu'>
          <div className='filter-search'>
            <FilterMenu />
            <input
              type='text'
              placeholder='Search for a pie...'
            />
          </div>
        {addPie}
        </div>
        <div className='all-pies-item-container'>
          {[]
            .concat(pies)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((pie) => (
              <SinglePieItem key={pie.id} pie={pie} isAdmin={this.state.isAdmin} delete={this.handleDelete}/>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    pies: state.pies,
    auth: state.auth
}
};

const mapDispatch = (dispatch) => {
  return {
    fetchPies: () => dispatch(fetchPies()),
    deletePie: (id) => dispatch(deletePie(id)),
  };
};

export default connect(mapState, mapDispatch)(AllPies);
