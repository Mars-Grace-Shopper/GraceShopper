import axios from 'axios';

// ACTION TYPES:
const SET_SINGLE_USER = 'SET_SINGLE_USER';

// ACTION CREATORS:
export const setSingleUser = (user) => ({
  type: SET_SINGLE_USER,
  user,
});

// THUNK CREATORS:
export const fetchSingleUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(setSingleUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.put(
          `/api/users/${updatedUser.id}`,
          updatedUser,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(setSingleUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// INITIAL STATE:
const initialState = {};

// SUB-REDUCER:
export default function singleUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
