import React from 'react';
import { Form } from './Form';
import { connect } from 'react-redux';
import { addPie, fetchPies } from '../store/allPies';

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      origin: '',
      type: '',
      description: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPies();
  }

  handleChange(event) {
    event.preventDefault();
    const className = event.target.className;
    const value = event.target.value;

    if (className === 'name') this.setState({ ...this.state, name: value });
    if (className === 'origin') this.setState({ ...this.state, origin: value });
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
    console.log(this.props)

    return (
      <div id='add-product'>
        <form id='add-edit-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>NAME </label>
          <input name='name' placeholder='Required' onChange={handleChange} />
          <br />
          <br />
          <label htmlFor='origin'>ORIGIN </label>
          <input name='origin' onChange={handleChange} />
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPies: () => dispatch(fetchPies()),
    addPie: (pie) => dispatch(addPie(pie)),
  };
};

export default connect(mapState, mapDispatch)(AddProduct);
