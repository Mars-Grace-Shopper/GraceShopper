import React from 'react';
import { connect } from 'react-redux';
import { fetchPies } from '../store/allPies';

export class AllPies extends React.Component {
  componentDidMount() {
    this.props.fetchPies();
  }

  render() {
    const pies = this.props.pies;
    console.log(this.props)

    return (
      <div id='all-robots'>
        {pies.map((pie) => (
            <div id='pies' key={pie.id}>
              <p>{pie.name}</p>
            </div>
          ))}
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
  };
};

export default connect(mapState, mapDispatch)(AllPies);
