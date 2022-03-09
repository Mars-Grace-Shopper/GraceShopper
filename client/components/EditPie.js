import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePie } from '../store/singlePie';

class EditPie extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      countryOrigin: '',
      type: '',
      description: '',
      thumbnailurl: '',
      price: 0,
      stockQuantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const pie = this.props.pie;
    this.setState({ ...pie });
  }

  async handleChange(event) {
    event.persist();
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'name') await this.setState({ ...this.state, name: value });
    if (name === 'countryOrigin')
      await this.setState({ ...this.state, countryOrigin: value });
    if (name === 'type') await this.setState({ ...this.state, type: value });
    if (name === 'description')
      await this.setState({ ...this.state, description: value });
    if (name === 'thumbnailurl')
      await this.setState({ ...this.state, thumbnailurl: value });
    if (name === 'price')
      await this.setState({ ...this.state, price: Number(value) });
    if (name === 'stockQuantity')
      await this.setState({ ...this.state, stockQuantity: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const pie = this.props.pie;

    if (this.state.type === null) {
      alert('Please pick a type!');
    } else {
      this.props.updatePie({ ...this.state, id: pie.id });
      this.props.history.goBack();
    }
  }

  render() {
    const { handleSubmit, handleChange } = this;
    const pie = this.props.pie;
    let price = this.props.pie.price;
    price = Number(price / 100).toFixed(2);

    const spanStyle = {
      color: 'red',
      fontSize: '12px',
      letterSpacing: '0.5px',
      fontWeight: 'normal',
    };
    const required = <span style={spanStyle}>*Required</span>;

    return (
      <div className='form-box'>
        <form className='add-edit-form' onSubmit={handleSubmit}>
          <div className='field-box'>
            <div className='title-box'>
              <div className='title'>
                <div className='pie-card'>
                  <img src={pie.thumbnailurl} />
                  <p>EDITING</p>
                </div>
                <h2>{pie.name}</h2>
              </div>
            </div>
            <div className='left-field'>
              <label htmlFor='name'>NAME {required}</label>
              <input
                onChange={handleChange}
                name='name'
                defaultValue={pie.name}
                pattern='^[A-Za-zÀ-ÖØ-öø-ÿ ]*$'
                required
                title='Please enter a valid name.'
              />
              <br />
              <br />
              <label htmlFor='countryOrigin'>COUNTRY {required}</label>
              <input
                onChange={handleChange}
                name='countryOrigin'
                defaultValue={pie.countryOrigin}
                pattern='^[A-Za-zÀ-ÖØ-öø-ÿ\(\) ]*$'
                required
                title='Please enter a valid name.'
              />
              <br />
              <br />
              <label htmlFor='type'>TYPE {required}</label>
              <select
                defaultValue={pie.type}
                onChange={handleChange}
                name='type'
              >
                <option value='Savory'>Savory</option>
                <option value='Sweet'>Sweet</option>
                <option value='Savory and sweet'>Savory and Sweet</option>
                <option value='Savory or sweet'>Savory or Sweet</option>
              </select>
            </div>
            <br />
            <br />
            <div className='right-field'>
              <div className='price-qty'>
                <div className='price'>
                  <label htmlFor='price'>PRICE</label>
                  <input
                    type='number'
                    step='.01'
                    min='0'
                    onChange={handleChange}
                    name='price'
                    defaultValue={price}
                  />
                </div>
                <br />
                <br />
                <div className='qty'>
                  <label htmlFor='stockQuantity'>QUANTITY</label>
                  <input
                    type='number'
                    step='1'
                    min='0'
                    onChange={handleChange}
                    name='stockQuantity'
                    defaultValue={pie.stockQuantity}
                  />
                </div>
              </div>
              <br />
              <br />
              <label htmlFor='description'>DESCRIPTION</label>
              <input
                onChange={handleChange}
                name='description'
                defaultValue={pie.description}
              />
              <br />
              <br />
              <label htmlFor='thumbnailurl'>PICTURE</label>
              <input
                onChange={handleChange}
                name='thumbnailurl'
                defaultValue={pie.thumbnailurl}
              />
            </div>
            <br />
            <br />
          </div>
          <div className='edit-buttons'>
            <Link to={`/pies/${pie.id}`}>
              <button className='back-button'>&#8249; BACK</button>
            </Link>
            <button type='submit' className='edit-submit'>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
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
