import React, {Component} from 'react'

export default class SinglePieView extends Component{

    render() {
        return(
            <div className='single-pie-view-container'>
                <h1>{this.props.match.params.name} Pie!</h1>
            </div>
        )
    }
}