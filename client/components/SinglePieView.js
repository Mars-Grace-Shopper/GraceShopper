import React, {Component} from 'react'
import { connect } from 'react-redux';
import { fetchSinglePie } from '../store/singlePie'
import EditPie from './EditPie';


export class SinglePieView extends Component{
    constructor() {
        super();
        this.state = {
            editPieView: false
        }
        this.handleClick =  this.handleClick.bind(this)
    }
   componentDidMount() {
        this.props.fetchSinglePie(this.props.match.params.id)
    }

    handleClick() {
        this.setState({...this.state, editPieView: !this.state.editPieView})
        this.props.fetchSinglePie(this.props.match.params.id)
    }
    render() {
        if(this.state.editPieView === false){
        return(
            <div className='single-pie-view-container'>
                <button className = 'edit-pie-button' onClick={this.handleClick}>Edit Pie Info</button>
                <img className='single-view-img' src={this.props.pie.thumbnailurl}/>
                <div className='single-view-text-container'>
                <h1> {this.props.pie.name}</h1>
                <h2>{this.props.pie.origin}</h2>
                <h3>{this.props.pie.description}</h3>
                </div>
            </div>
        )
        }
        return <EditPie pie={this.props.pie} click={this.handleClick}/>

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