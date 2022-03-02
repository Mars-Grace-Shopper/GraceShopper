import React, {Component} from 'react'
import { connect } from 'react-redux';
import { fetchSinglePie } from '../store/singlePie'


export class SinglePieView extends Component{
    componentDidMount() {
        this.props.fetchSinglePie(this.props.match.params.id)
    }
    render() {
        return(
            <div className='single-pie-view-container'>
                <h1> {this.props.pie.name}</h1>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
      pie: state.pie,
    };
  };

const mapDispatch = (dispatch) => {
    return {
      fetchSinglePie: (id) => dispatch(fetchSinglePie(id)),
    };
  };
  
  export default connect(mapState, mapDispatch)(SinglePieView);