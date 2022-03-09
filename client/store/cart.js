import axios from 'axios';

// ACTION TYPE:
const SET_CART = 'SET_CART';

// ACTION CREATOR:
export const setCart = (cart) => {
    return {
      type: SET_CART,
      cart,
    };
};

// THUNK CREATOR:
export const fetchCart = () => {
    return async (dispatch) => {
      try {
        const token = window.localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/cart', {
              headers: {
                authorization: token
              }
          });
          localStorage.setItem('cart', JSON.stringify(res.data));
          dispatch(setCart(res.data));
        }
        dispatch(setCart(eval(localStorage.getItem('cart'))));
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
      case SET_CART:
        return action.cart;
      default:
        return state;
    }
}
