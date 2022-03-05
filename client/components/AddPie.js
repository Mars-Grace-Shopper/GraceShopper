import React from 'react';
import { connect } from 'react-redux';
import { addPie, fetchPies } from '../store/allPies';
import { Link } from 'react-router-dom';
import { me } from '../store/auth.js';

class AddPie extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      countryOrigin: '',
      type: '',
      description: '',
      isAdmin: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let token = window.localStorage.getItem('token');
    if (token) {
      await this.props.getAuth();
      if (this.props.auth.type === 'admin')
        this.setState({ ...this.state, isAdmin: true });
    }
  }

  handleChange(event) {
    event.preventDefault();
    const className = event.target.className;
    const value = event.target.value;

    if (className === 'name') this.setState({ ...this.state, name: value });
    if (className === 'countryOrigin')
      this.setState({ ...this.state, countryOrigin: value });
    if (className === 'type') this.setState({ ...this.state, type: value });
    if (className === 'description')
      this.setState({ ...this.state, description: value });
    if (className === 'thumbnailurl')
      this.setState({ ...this.state, thumbnailurl: value });
    if (className === 'price')
      this.setState({ ...this.state, price: Number(value) });
    if (className === 'quantity')
      this.setState({ ...this.state, quantity: Number(value) });

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addPie({ ...this.state });
    this.props.history.goBack();
  }

  render() {
    const { handleSubmit, handleChange } = this;

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
              <div className='title' style={{ padding: '0px' }}>
                <h2>Add a Pie!</h2>
              </div>
            </div>
            <div className='left-field'>
              <label htmlFor='name'>NAME {required}</label>
              <input onChange={handleChange} name='name' />
              <br />
              <br />
              <label htmlFor='countryOrigin'>COUNTRY {required}</label>
              <input onChange={handleChange} name='countryOrigin' />
              <br />
              <br />
              <label htmlFor='type'>TYPE {required}</label>
              <select defaultValue='Savory' onChange={handleChange} name='type'>
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
                    max='99.99'
                    onChange={handleChange}
                    name='price'
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
                  />
                </div>
              </div>
              <br />
              <br />
              <label htmlFor='description'>DESCRIPTION</label>
              <input onChange={handleChange} name='description' />
              <br />
              <br />
              <label htmlFor='thumbnailurl'>PICTURE</label>
              <input onChange={handleChange} name='thumbnailurl' />
            </div>
            <br />
            <br />
          </div>
          <div className='edit-buttons'>
            <Link to='/pies'>
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
    pies: state.pies,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPies: () => dispatch(fetchPies()),
    addPie: (pie) => dispatch(addPie(pie)),
    getAuth: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(AddPie);
