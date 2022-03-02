import React, {Component} from 'react'
import {connect} from 'react-redux'
import FeaturedItems from './FeaturedItems'


export default class HomePage extends Component {


    render() {
        return( 
            <div className='homepage-container'>
                <FeaturedItems />
                <div className='introductions'>
                    <h1>About Us!</h1>
                    <p>We love pies from around the world!</p>
                </div>
            </div>
        )
    }
}