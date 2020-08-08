import {
  PROFILE_SUCCESS,
  PROFILE_ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {
  profile: [],
  response: "",
  setProfile: false,
};

const allProfile =(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        response: action.payload.messages,
        setProfile: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        response: action.payload.errors,
        setProfile: false,
      };
    

    default:
      return state;
  }
};
export default allProfile