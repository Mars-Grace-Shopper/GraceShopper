import React, { Component } from 'react';
import SingleUserRow from './SingleUserRow';
import { FilterMenuUsers } from './FilterMenuUsers';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/allUsers';
import { Link } from 'react-router-dom';
// import { deletePie } from '../store/allPies';
import ClipLoader from "react-spinners/ClipLoader";
import AdminToolbar from './AdminToolbar';

export class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false,
      isLoading: true,
    }
    // this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers().then(() => {
      this.setState({...this.state, isLoading: false });
    });
    if(this.props.auth.type === 'admin') this.setState({...this.state, isAdmin: true});
  }

//   handleDelete(id){
//     this.props.deletePie(id);
//   }

  render() {
    const users = this.props.users;
    // let addPie = <div></div>
    // if(this.state.isAdmin === true) addPie = <Link to='/addpie'><button>ADD PRODUCT</button></Link>

    let component = this.state.isLoading ? 
    <div className='loading-page'>
      <div className='spinner'>
        <ClipLoader color={'#1B69E7'} size={60}/> 
      </div>
    </div>
    : 
    (<div className='all-users-view'>
        <AdminToolbar/>
        <div className='all-users-table'>
          <div className='filter-search'>
            <FilterMenuUsers />
            <input
              type='text'
              placeholder='Who are you looking for...?'
            />
          </div>
            <table>
                <tbody>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                {users
                    // .concat(users)
                    // .sort((a, b) => a.name.localeCompare(b.name))
                    .map((user) => (
                    <SingleUserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
        <div className='invisible-div2'></div>
    </div>);

    return component;
  }
}

// delete={this.handleDelete}

const mapState = (state) => {
  return {
    users: state.users,
    auth: state.auth
    }
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    // deletePie: (id) => dispatch(deletePie(id)),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
