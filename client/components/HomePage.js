import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeaturedItems from './FeaturedItems';

export default class HomePage extends Component {
  render() {
    return (
      <div className='homepage-container'>
        <FeaturedItems />
        <div className='introductions'>
          <h1>WELCOME TO iHOPie!</h1>
          <div className='intro-para'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
