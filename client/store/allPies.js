import axios from 'axios';

// ACTION TYPE:
const SET_PIES = 'SET_PIES';

// ACTION CREATOR:
export const setPies = (pies) => {
  return {
    type: SET_PIES,
    pies
  };
};

// THUNK CREATOR:
export const fetchPies = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/pies');
      dispatch(setPies(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//INITIAL STATE:
const initialState = [];

//SUB-REDUCER:
// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function piesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PIES:
      return action.pies;
    default:
      return state;
  }
}
