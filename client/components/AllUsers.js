import React, { Component } from 'react';
import SingleUserRow from './SingleUserRow';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/allUsers';
import { Link } from 'react-router-dom';
// import { deletePie } from '../store/allPies';
import ClipLoader from 'react-spinners/ClipLoader';
import AdminToolbar from './AdminToolbar';

export class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
      isLoading: true,
      filter: '',
      listOfUsers: [],
    };
    // this.handleDelete = this.handleDelete.bind(this)
    this.handleSetFilter = this.handleSetFilter.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers().then(() => {
      this.setState({ ...this.state, listOfUsers: this.props.users });
      this.setState({ ...this.state, isLoading: false });
    });
    if (this.props.auth.type === 'admin')
      this.setState({ ...this.state, isAdmin: true });
  }

  //   handleDelete(id){
  //     this.props.deletePie(id);
  //   }

  async handleSetFilter(event) {
    await this.setState({ ...this.state, filter: event.target.value });
  }

  renderFilteredUsers() {
    let replace;
    if (this.state.filter === 'id') {
      replace = '';
    } else {
      replace = this.state.filter;
    }

    let newRegex = new RegExp(`${replace}`, 'i');
    return []
      .concat(this.state.listOfUsers)
      .filter((user) => newRegex.test(user.type))
      .map((user) => <SingleUserRow key={user.id} user={user} />);
  }

  render() {
    const users = this.props.users;
    // let addPie = <div></div>
    // if(this.state.isAdmin === true) addPie = <Link to='/addpie'><button>ADD PRODUCT</button></Link>

    let component = this.state.isLoading ? (
      <div className='loading-page'>
        <div className='spinner'>
          <ClipLoader color={'#1B69E7'} size={60} />
        </div>
      </div>
    ) : (
      <div className='all-users-view'>
        <AdminToolbar />
        <div className='all-users-table'>
          <div className='filter-search'>
            <div className='filter'>
              <select defaultValue='id' onChange={this.handleSetFilter}>
                <option value='id'>Sort by: User ID</option>
                <option value='admin'>Sort by: Admin</option>
                <option value='user'>Sort by: User</option>
              </select>
            </div>
            <input type='text' placeholder='Who are you looking for...?' />
          </div>
          <table>
            <tbody>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              {this.renderFilteredUsers()}
            </tbody>
          </table>
        </div>
        <div className='invisible-div2'></div>
      </div>
    );

    return component;
  }
}

// delete={this.handleDelete}

const mapState = (state) => {
  return {
    users: state.users,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    // deletePie: (id) => dispatch(deletePie(id)),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
