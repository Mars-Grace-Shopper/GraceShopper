import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeaturedItems from './FeaturedItems';
import { Link } from 'react-router-dom'

export default class HomePage extends Component {

  render() {
    
    return (
      <div className='homepage-container'>
        <FeaturedItems />
        <div className='introductions'>
          <h1>WELCOME TO iHOPie!</h1>
          <div className='intro-para'>
            <p>
              Your source for delicious pies from around the world, brought to you by <span data-hover="Brooke, Joanne, Mai, and Sarina!">Team Mars</span>!<br/>
              Experience only the finest, first-rate, five-star, Gordon Ramsey himself approved pies from a myriad of different places and cultures.<br/><br/>
              We are a company based in the U.S. even though our pies are shipped from their respective countries for the most authentic experience; hence the prices so don't question it. We are just that good trust us fam fr lmao<br /><br />
              Not to be confused with IHOP&#174; as we are better than them. No we do not take criticism.<br /><br />
              <span data-hover="yall are cute af">Enjoy your stay! &#x2665;</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
