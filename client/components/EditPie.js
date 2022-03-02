import React, {Component} from 'react'
import { connect } from 'react-redux';
import { updatePie } from '../store/singlePie'


export class EditPie extends Component{
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

    }
    componentDidMount(){
        const pie = this.props.pie
        this.setState({...this.props.pie})
      }
      
    render() {
        return (
            <form id='add-edit-form'>
                <label htmlFor='name'>NAME </label>
                    <input name='name' />
            <br />
            <br />
                <label htmlFor='country'>COUNTRY </label>
                     <input name='country' />
            <br />
            <br />
                <label htmlFor='description'>DESCRIPTION </label>
                     <input name='description' />
            <br />
            <br />
                <label htmlFor='price'>PRICE </label>
                        <input name='price' />
            <br />
            <br />
                <label htmlFor='quantity'>QUANTITY </label>
                     <input name='quantity' />
            <br />
            <br />
                <label htmlFor='ingredients'>INGREDIENTS </label>
                     <input name='ingredients' />
            <br />
            <br />
                <label htmlFor='thumbnailurl'>PICTURE</label>
                        <input name='thumbnailurl' placeholder='Link an image!' />
            <br />
            <br />
            <button type='submit' id='add-edit-form-submit'>Submit</button>
            </form>
  );
}
}