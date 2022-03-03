import React, {Component} from 'react'
import { connect } from 'react-redux';
import { updatePie } from '../store/singlePie'


class EditPie extends Component{
    constructor() {
        super();
        this.state = {
            name:'',
            countryOrigin:'',
            type:'',
            description:'',
            thumbnailurl:'',
            price:0,
            stockQuantity:0,
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
        console.log(value);
        if(event.target.name === 'name') await this.setState({...this.state, name: value})
        if(event.target.name === 'country') await this.setState({...this.state, countryOrigin: value})
        if(event.target.name === 'type') await this.setState({...this.state, type: value})
        if(event.target.name === 'description') await this.setState({...this.state, description: value})
        if(event.target.name === 'thumbnailurl') await this.setState({...this.state, thumbnailurl: value})
        if(event.target.name === 'price') await this.setState({...this.state, price: value})
        if(event.target.name === 'stockQuantity') await this.setState({...this.state, stockQuantity: value})
        console.log(this.state.type);


      }

      handleSubmit (event) {
        event.preventDefault();
        const pie = this.props.pie
        this.props.updatePie({...this.state, id: pie.id});
        this.props.click();
      }
      
    render() {
        const pie = this.props.pie
        return (
            <form id='add-edit-form' onSubmit={this.handleSubmit}>
                <label htmlFor='name'>NAME </label>
                    <input onChange={this.handleChange} name='name' placeholder={pie.name}/>
            <br />
            <br />
                <label htmlFor='country'>COUNTRY </label>
                     <input onChange={this.handleChange} name='country' placeholder={pie.countryOrigin} />
            <br />
            <br />
            <select defaultValue={pie.type} onChange={this.handleChange} name='type'>
                <option value="Savory">Savory</option>
                <option value="Sweet">Sweet</option>
                <option value="Savory and sweet">Savory and Sweet</option>
                <option value="Savory or sweet">Savory or Sweet</option>
             </select>
            <br />
            <br />
                <label htmlFor='description'>DESCRIPTION </label>
                     <input onChange={this.handleChange} name='description' placeholder={pie.description}/>
            <br />
            <br />
                <label htmlFor='price'>PRICE </label>
                        <input type="number" step='.01' min='0' max='99.99' onChange={this.handleChange} name='price' placeholder={pie.price} />
            <br />
            <br />
                <label htmlFor='quantity'>QUANTITY </label>
                     <input type='number' step='1' min='0' onChange={this.handleChange} name='stockQuantity' placeholder={pie.stockQuantity}/>
            <br />
            {/* <br />
                <label htmlFor='ingredients'>INGREDIENTS </label>
                     <input name='ingredients' />
            <br />
            <br /> */}
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