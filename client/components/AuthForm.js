import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { Link } from 'react-router-dom';
import {SignUpAddressForm} from './AddressForm';

const AuthForm = (props) => {
  const spanStyle = {
    color: "red",
    fontSize: "12px",
    letterSpacing: "0.5px",
    fontWeight: "normal",
  };
  const required = <span style={spanStyle}>*Required</span>;
  const { name, displayName, title, handleSubmit, error } = props;
  let signUpInfo;
  if (name === 'signup') {
    signUpInfo = (
      <div>
        <div>
          <label htmlFor='firstName'>FIRST NAME</label>
          <input name='firstName' type='text'  pattern='*'
            required/>
        </div>
        <div>
          <label htmlFor='lastName'>LAST NAME</label>
          <input name='lastName' type='text'  pattern='*'
            required/>
        </div>
        <div>
          <label htmlFor='email'>EMAIL</label>
          <input name='email' type='email'  pattern='/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i'
            required
            title='Please enter a valid email.'/>
        </div>
        <label htmlFor="streetAddress">STREET ADDRESS {required}</label>
        <input
          onChange={props.change}
          name="streetAddress"
          pattern="^[A-Za-z0-9 ]*$"
          required
          title="Please enter a valid street address."
        />
        <div className="city">
          <label htmlFor="city">CITY</label>
          <input
            onChange={props.change}
            name="city"
            // defaultValue={props.address.city}
            pattern="^[A-Za-z]*$"
            required
            title="Please enter a valid street address."
          />
        </div>
        <div className="qty">
          <label htmlFor="state">STATE</label>
          <input
            pattern="^[A-Za-z]*$"
            // defaultValue={props.address.state}
            onChange={props.change}
            name="state"
            required
            title="Please enter a valid state."
          />
        </div>

      </div>
    );
  }

  return (
    <div className='info-input'>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {signUpInfo}
          <label htmlFor='username'>USERNAME</label>
          <input
            name='username'
            type='text'
            pattern='*'
            required
          />
        </div>
        <div>
          <label htmlFor='password'>PASSWORD</label>
          <input name='password' type='password' pattern='*'
            required/>
        </div>
        {/* <SignUpAddressForm change={()=>''}/> */}
        <button type='submit' >{displayName}</button>

        {error && error.response && <div className='error'> {error.response.data} </div>}
        
      </form>
      {name === 'signup' ? (
        <Link to='/login' className='login-signup'>
          Have an account already? Sign in!
        </Link>
      ) : (
        <Link to='/signup' className='login-signup'>
          Don't have an account? Sign up!
        </Link>
      )}
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    title: 'Login',
    displayName: 'LOG IN',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    title: 'Signup',
    displayName: 'SIGN UP',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const userObj = {};
      const formName = evt.target.name;

      userObj.username = evt.target.username.value;
      userObj.password = evt.target.password.value;

      if (formName === 'signup') {
        userObj.email = evt.target.email.value;
        userObj.firstName = evt.target.firstName.value;
        userObj.lastName = evt.target.lastName.value;

        // get the cart they made before signup
        let localCart = eval(localStorage.getItem("cart"));
        if (!Array.isArray(localCart)) {
           localCart = []
        }
        userObj.localCart = localCart;
      }

      dispatch(authenticate(userObj, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
