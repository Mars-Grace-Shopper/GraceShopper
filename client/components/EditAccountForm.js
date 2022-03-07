import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleUser, updateUser } from '../store/singleUser';

class EditAccountForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      thumbnailurl: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const userId = this.props.auth.id
    this.props.fetchSingleUser(userId)
    const user = this.props.user;
    this.setState({ ...user });
  }

  async handleChange(event) {
    event.persist();
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'firstName')
      await this.setState({ ...this.state, firstName: value });
    if (name === 'lastName')
      await this.setState({ ...this.state, lastName: value });
    if (name === 'email')
      await this.setState({ ...this.state, email: value });
    if (name === 'password')
      await this.setState({ ...this.state, password: value });
    // if (name === 'thumbnailurl')
    //   await this.setState({ ...this.state, thumbnailurl: value });
    // if (name === 'price')
    //   await this.setState({ ...this.state, price: value });
    // if (name === 'stockQuantity')
    //   await this.setState({ ...this.state, stockQuantity: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.props.user;
    this.props.updateUser({ ...this.state, id: user.id });
    this.props.history.goBack();
    
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const user = this.props.user;

    const spanStyle = {
      color: 'red',
      fontSize: '12px',
      letterSpacing: '0.5px',
      fontWeight: 'normal',
    };
    const required = <span style={spanStyle}>*Required</span>;

    return (
      <div className='form-box'>
        <form className='add-edit-form' onSubmit={handleSubmit}>

          <div className='field-box'>
            <div className='title-box'>
              <div className='title'>
                <div className='pie-card'>
                  <img src={user.thumbnailurl} />
                  <p>EDITING</p>
                </div>
                <h2>{user.name}</h2>
              </div>
            </div>

            <div className='left-field'>
              <h3>ACCOUNT INFORMATION</h3>
              <br />
              <br />
              <label htmlFor='firstName'>FIRST NAME {required}</label>
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
              <label htmlFor='lastName'>LAST NAME {required}</label>
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
              <label htmlFor='email'>EMAIL {required}</label>
              <input
                onChange={handleChange}
                name='email'
                type='email'
                defaultValue={user.email}
                pattern='^[A-Za-z ]*$'
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
              <label htmlFor='password'>CURRENT PASSWORD</label>
              <input
                onChange={handleChange}
                name='password'
                type='password'
              />
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
              <label htmlFor='thumbnailurl'>CONFIRM NEW PASSWORD</label>
              <input
                onChange={handleChange}
                name='password'
                type='password'
              />
            </div>
          </div>

          <div>
            <div className='left-field'>
              <h3>ADDRESS</h3>
              <br />
              <br />
              <label htmlFor='streetAddress'> STREET ADDRESS {required}</label>
              <input
                onChange={handleChange}
                name='streetAddress'
                defaultValue={user.streetAddress}
                pattern='^[A-Za-z ]*$'
                required
                title='Please enter a valid name.'
              />
            </div>

            <div className='price-qty'>
                <div className='price'>
                  <label htmlFor='city'>CITY {required}</label>
                  <input
                    onChange={handleChange}
                    name='city'
                    defaultValue={user.city}
                    pattern='^[A-Za-z ]*$'
                    required
                    title='Please enter a valid name.'
                  />
                </div>
                <br />
                <br />
                <div className='price'>
                  <label htmlFor='state'>STATE {required}</label>
                  <input
                    onChange={handleChange}
                    name='state'
                    defaultValue={user.state}
                    pattern='^[A-Za-z ]*$'
                    required
                    title='Please enter a valid state.'
                  />
                </div>
                <br />
                <br />
                <div className='price'>
                <label htmlFor='zipcode'>ZIPCODE {required}</label>
              <input
                onChange={handleChange}
                name='zipcode'
                defaultValue={user.zipcode}
                pattern='^[A-Za-z ]*$'
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
  };
};

export default connect(mapState, mapDispatch)(EditAccountForm);
