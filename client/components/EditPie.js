import React, {Component} from 'react'
import { connect } from 'react-redux';
import { updatePie } from '../store/singlePie'


class EditPie extends Component{
    constructor() {
        super();
        this.state = {
            name:'',
            origin:'',
            type:'',
            description:'',
            thumbnailurl:'',
            price:0,
            quanitity:0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        const pie = this.props.pie
        this.setState({...pie})
      }

      async handleChange(event) {
        event.persist()
        event.preventDefault();
        const value = event.target.value
        if(event.target.name === 'name') await this.setState({...this.state, name: value})
        if(event.target.name === 'origin') await this.setState({...this.state, origin: value})
        if(event.target.name === 'type') await this.setState({...this.state, type: value})
        if(event.target.name === 'description') await this.setState({...this.state, description: value})
        if(event.target.name === 'thumbnailurl') await this.setState({...this.state, thumbnailurl: value})
        if(event.target.name === 'price') await this.setState({...this.state, price: value})
        if(event.target.name === 'quantity') await this.setState({...this.state, quantity: value})


      }

      handleSubmit (event) {
        event.preventDefault();
        const pie = this.props.pie
        this.props.updatePie({...this.state, id: pie.id});
        this.props.click();
      }
      
    render() {
        console.log(this.state);
        return (
            <form id='add-edit-form' onSubmit={this.handleSubmit}>
                <label htmlFor='name'>NAME </label>
                    <input onChange={this.handleChange} name='name' />
            <br />
            <br />
                <label htmlFor='country'>COUNTRY </label>
                     <input onChange={this.handleChange} name='origin' />
            <br />
            <br />
                <label htmlFor='description'>DESCRIPTION </label>
                     <input onChange={this.handleChange} name='description' />
            <br />
            <br />
                <label htmlFor='price'>PRICE </label>
                        <input onChange={this.handleChange} name='price' />
            <br />
            <br />
                <label htmlFor='quantity'>QUANTITY </label>
                     <input onChange={this.handleChange} name='quantity' />
            <br />
            <br />
                <label htmlFor='ingredients'>INGREDIENTS </label>
                     <input name='ingredients' />
            <br />
            <br />
                <label htmlFor='thumbnailurl'>PICTURE</label>
                        <input onChange={this.handleChange} name='thumbnailurl' placeholder='Link an image!' />
            <br />
            <br />
            <button type='submit' id='add-edit-form-submit'>Submit</button>
            </form>
  );
}
}

const mapState = (state) => {
    return {
      pie: state.pie,

    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      updatePie: (updatedPie) => dispatch(updatePie(updatedPie)),
    };
  };
  
  export default connect(mapState, mapDispatch)(EditPie);