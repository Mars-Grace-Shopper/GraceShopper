import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser, updateUser } from '../store/singleUser';
import {me} from '../store/auth'

class EditAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      newPassword:'',
      confirmPassword: '',
      address: {
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const user = this.props.auth
    const userId = this.props.auth.id
    this.props.fetchSingleUser(userId)
    await this.props.getAuth();
    if (this.props.auth)
      this.setState({ ...this.state, firstName: user.firstName, lastName: user.lastName, email:user.email, address: this.props.auth.address });
  }

  async handleChange(event) {
    event.persist();
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'firstName')
      this.setState({ ...this.state, firstName: value });
    if (name === 'lastName')
      this.setState({ ...this.state, lastName: value });
    if (name === 'email')
      this.setState({ ...this.state, email: value });
    if (name === 'newPassword')
      this.setState({ ...this.state, newPassword: value });
    if (name === 'confirmPassword')
      this.setState({ ...this.state, confirmPassword: value });
      if (name === "streetAddress")
      this.setState({
        ...this.state,
        address: { ...this.state.address, streetAddress: value },
      });
    if (name === "city")
      this.setState({
        ...this.state,
        address: { ...this.state.address, city: value },
      });
    if (name === "state")
      this.setState({
        ...this.state,
        address: { ...this.state.address, state: value },
      });
    if (name === "zipcode")
      this.setState({
        ...this.state,
        address: { ...this.state.address, zipcode: value },
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.props.user;

    if (this.state.newPassword !== this.state.confirmPassword) {
      alert("The new passwords do not match!");
    } else {
      this.props.updateUser({...this.state, id: user.id});
      this.props.history.goBack();
    }
  }

  render() {
    const { handleSubmit, handleChange } = this;
    // const this.state = this.props.auth.address
    const user = this.props.user

    // const spanStyle = {
    //   color: 'red',
    //   fontSize: '12px',
    //   letterSpacing: '0.5px',
    //   fontWeight: 'normal',
    // };

    // const required = <span style={spanStyle}>*Required</span>;

    return (
      <div className='form-box'>
        <form className='add-edit-form' onSubmit={handleSubmit}>
          <div className='field-box'>
            <div className='title-box'>
              <div className='title'>
                <div className='pie-card'>
                  <img src= "/blank-profile-picture.webp" />
                  <p>EDITING</p>
                </div>
                <h2>{user.name}</h2>
              </div>
            </div>

            <div className='left-field'>
              <h3>ACCOUNT this.stateRMATION</h3>
              <br />
              <br />
              <label htmlFor='firstName'>FIRST NAME</label>
              <input
                onChange={handleChange}
                name='firstName'
                defaultValue={user.firstName}
                pattern='^[A-Za-z ]*$'
                required
                title='Please enter a valid name.'
              />
              <br />
              <br />
              <label htmlFor='lastName'>LAST NAME</label>
              <input
                onChange={handleChange}
                name='lastName'
                defaultValue={user.lastName}
                pattern='^[A-Za-z ]*$'
                required
                title='Please enter a valid name.'
              />
              <br />
              <br />
              <label htmlFor='email'>EMAIL</label>
              <input
                onChange={handleChange}
                name='email'
                type='email'
                defaultValue={user.email}
                required
                title='Please enter a valid email.'
              />
            </div>

            <br />
            <br />

            <div className='right-field'>
              <h3>CHANGE PASSWORD</h3>
              <br />
              <br />
              <label htmlFor='password'>NEW PASSWORD</label>
              <input
                onChange={handleChange}
                name='password'
                type='password'
              />
              <br />
              <br />
              <label htmlFor='confirmPassword'>CONFIRM NEW PASSWORD</label>
              <input
                onChange={handleChange}
                name='confirmPassword'
                type='password'
              />
            </div>
          </div>

          <div>
            <div className='left-field'>
              <h3>ADDRESS</h3>
              <br />
              <br />
              <label htmlFor='streetAddress'> STREET ADDRESS</label>
              <input
                onChange={handleChange}
                name='streetAddress'
                defaultValue={this.state.streetAddress}
                required
                title='Please enter a valid name.'
              />
            </div>

            <div className='city-state-zip'>
                <div className='price'>
                  <label htmlFor='city'>CITY</label>
                  <input
                    onChange={handleChange}
                    name='city'
                    defaultValue={this.state.city}
                    pattern='^[A-Za-z ]*$'
                    required
                    title='Please enter a valid name.'
                  />
                </div>
                <br />
                <br />
                <div className='price'>
                  <label htmlFor='state'>STATE</label>
                  <input
                    onChange={handleChange}
                    name='state'
                    defaultValue={this.state.state}
                    pattern='^[A-Za-z ]*$'
                    required
                    title='Please enter a valid state.'
                  />
                </div>
                <br />
                <br />
                <div className='price'>
                <label htmlFor='zipcode'>ZIPCODE</label>
              <input
                onChange={handleChange}
                name='zipcode'
                defaultValue={this.state.zipcode}
                title='Please enter a valid zipcode.'
              />
                  
                </div>
            </div>
            </div>
          <div className='edit-buttons'>
            <Link to={`/userhome`}>
              <button className='back-button'>&#8249; BACK</button>
            </Link>
            <button type='submit' className='edit-submit'>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleUser: (userId) => dispatch(fetchSingleUser(userId)),
    updateUser: (updatedUser) => dispatch(updateUser(updatedUser)),
    getAuth: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(EditAccountForm);
