import axios from 'axios';

// ACTION TYPE:
const SET_USERS = 'SET_USERS';

// ACTION CREATOR:
export const setUsers = (users) => {
    return {
      type: SET_USERS,
      users,
    };
};

// THUNK CREATOR:
export const fetchUsers = () => {
    return async (dispatch) => {
      try {
        const token = window.localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/users', {
              headers: {
                authorization: token
              }
          });
          dispatch(setUsers(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
};

//INITIAL STATE:
const initialState = [];

//SUB-REDUCER:
export default function usersReducer(state = initialState, action) {
    switch (action.type) {
      case SET_USERS:
        return action.users;
      default:
        return state;
    }
}