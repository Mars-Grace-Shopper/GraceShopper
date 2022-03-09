import React, { Component } from 'react';
import SinglePieRow from './SinglePieRow';
import { connect } from 'react-redux';
import { fetchPies } from '../store/allPies';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import AdminToolbar from './AdminToolbar';

export class AllPiesTable extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.fetchPies().then(() => {
      this.setState({ ...this.state, isLoading: false });
    });
    if (this.props.auth.type === 'admin')
      this.setState({ ...this.state, isAdmin: true });
  }

  render() {
    const pies = this.props.pies;

    let component = this.state.isLoading ? (
      <div className='loading-page'>
        <div className='spinner'>
          <ClipLoader color={'#1B69E7'} size={60} />
        </div>
      </div>
    ) : (
      <div className='all-users-view'>
        <AdminToolbar />
        <div className='all-pies-table'>
          <div className='filter-search'>
            <input
              type='text'
              placeholder='Search for a pie...'
              style={{ margin: '0' }}
            />
          </div>
          <table>
            <tbody>
              <tr>
                <th>🥧</th>
                <th>Pie ID</th>
                <th>Name</th>
                <th>Country Origin</th>
                <th>Type</th>
                <th>Description</th>
                <th>{`Unit Price ($)`}</th>
                <th>Stock Qty.</th>
                <th>Country Code</th>
              </tr>
              {[]
                .concat(pies)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((pie) => (
                  <SinglePieRow key={pie.id} pie={pie} />
                ))}
            </tbody>
          </table>
        </div>
        <div className='invisible-div2'></div>
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
    fetchPies: () => dispatch(fetchPies()),
  };
};

export default connect(mapState, mapDispatch)(AllPiesTable);
