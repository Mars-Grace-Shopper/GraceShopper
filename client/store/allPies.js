import axios from 'axios';

// ACTION TYPE:
const SET_PIES = 'SET_PIES';
const ADD_PIE = 'SET_PIE';

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
            authorization: token,
          },
        });
        dispatch(createPie(data));
      } else throw new Error('unauthorized');
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
        await axios.delete(`/api/pies/${pieId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(fetchPies());
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
    default:
      return state;
  }
}
