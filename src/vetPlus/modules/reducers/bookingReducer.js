import {
  VET_SUCCESS,
  VET_ERROR,
  BOOKING_SUCCESS,
  BOOKING_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  vets: [],
  response: '',
  setProfile: false,
  bookingSaved: false,
  new_response: '',
};

const allVets = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VET_SUCCESS:
      return {
        ...state,
        vets: action.payload.profile,
        response: action.payload.messages,
        setProfile: true,
      };
    case VET_ERROR:
      return {
        ...state,
        vets: [],
        response: action.payload.errors,
        setProfile: false,
      };
    case BOOKING_SUCCESS:
      return {
        ...state,
        bookingSaved: true,
        new_response: action.payload.messages,

      };
    case BOOKING_ERROR:
      return {
        ...state,
        bookingSaved: false,
        new_response: action.payload.errors,

      };

    default:
      return state;
  }
};
export default allVets;
