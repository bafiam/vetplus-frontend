import { GET_BOOKING_SUCCESS, GET_BOOKING_ERROR } from "../actions/actionTypes";
const INITIAL_STATE = {
  Appointments: {},
  response: "",
  loading: false
};

const myBookings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BOOKING_SUCCESS:
      return {
        ...state,
        Appointments: action.payload.profile,
        response: action.payload.messages,
        loading:true
      };
    case GET_BOOKING_ERROR:
      return {
        ...state,
        Appointments: {},
        response: action.payload.errors,
        loading:false
      };
    default:
      return state;
  }
};
export default myBookings;
