import React from 'react';
import { connect } from 'react-redux';
import { addPie, fetchPies } from '../store/allPies';
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
    if (className === 'countryOrigin') this.setState({ ...this.state, countryOrigin: value });
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
    this.props.history.push('/pies');
  }

  render() {
    const { handleSubmit, handleChange } = this;

    return (
      <div id='add-product'>
        <form id='add-edit-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>NAME </label>
          <input name='name' placeholder='Required' onChange={handleChange} />
          <br />
          <br />
          <label htmlFor='countryOrigin'>countryOrigin </label>
          <input name='countryOrigin' placeholder='Required' onChange={handleChange} />
          <br />
          <br />
          <label htmlFor='type'>TYPE </label>
          <input name='type' placeholder='Required' onChange={handleChange} />
          <br />
          <br />
          <label htmlFor='description'>DESCRIPTION </label>
          <input name='description' onChange={handleChange} />
          <br />
          <br />
          <label htmlFor='price'>PRICE </label>
          <input name='price' onChange={handleChange} />
          <br />
          <br />
          <label htmlFor='quantity'>QUANTITY </label>
          <input name='quantity' onChange={handleChange} />
          <br />
          <br />
          <label htmlFor='thumbnailurl'>PICTURE</label>
          <input name='thumbnailurl' onChange={handleChange} />
          <br />
          <br />
          <button type='submit' id='add-edit-form-submit'>
            SUBMIT
          </button>
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
