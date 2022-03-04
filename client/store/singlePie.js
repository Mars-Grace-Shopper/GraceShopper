import axios from "axios";

// ACTION TYPES:
const SET_SINGLE_PIE = "SET_SINGLE_PIE";

// ACTION CREATORS:
export const setSinglePie = (pie) => ({
  type: SET_SINGLE_PIE,
  pie,
});

// THUNK CREATORS:
export const fetchSinglePie = (pieId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/pies/${pieId}`);
      dispatch(setSinglePie(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePie = (updatedPie) => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(
        `/api/pies/${updatedPie.id}`,
        updatedPie,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(setSinglePie(data));
    }
  } catch (error) {
    next(error);
  }
};

// INITIAL STATE:
const initialState = {};

// SUB-REDUCER:
export default function singlePieReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PIE:
      return action.pie;
    default:
      return state;
  }
}
