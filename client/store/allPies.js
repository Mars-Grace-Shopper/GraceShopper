import axios from 'axios';

// ACTION TYPE:
const SET_PIES = 'SET_PIES';
const ADD_PIE = 'ADD_PIE';
const REMOVE_PIE = 'REMOVE_PIE';
const FILTER_PIES = 'FILTER_PIES';

// ACTION CREATOR:
export const setPies = (pies) => {
  return {
    type: SET_PIES,
    pies,
  };
};

export const createPie = (pie) => {
  return {
    type: ADD_PIE,
    pie,
  };
};

export const removePie = (pieId) => {
  return {
    type: REMOVE_PIE,
    pieId,
  };
};

export const filterPies = (filter) => {
  return {
    type: FILTER_PIES,
    filter,
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

export const addPie = (pie) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
      const { data } = await axios.post('/api/pies', pie, {
        headers: {
          authorization: token
        }});
        dispatch(createPie(data));
      }
      else throw new Error('unauthorized');
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePie = (pieId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
      await axios.delete(`/api/pies/${pieId}`,{
        headers: {
          authorization: token
        }});
      dispatch(removePie(pieId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//INITIAL STATE:
const initialState = [];

//SUB-REDUCER:
export default function piesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PIES:
      return action.pies;
    case ADD_PIE:
      return action.pie;
    case REMOVE_PIE:
      console.log('redux DELETE action', action);
      console.log('redux DELETE state', state);
      const newPiesArray = state.filter(x => x.id != action.pieId)
      return newPiesArray;
    case FILTER_PIES:
      console.log('reudcer filter', action.filter, '-- state:', state)
      return state
    default:
      return state;
  }
}
