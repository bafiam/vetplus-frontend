import { PROFILE_SUCCESS, PROFILE_ERROR } from '../actions/actionTypes';

const INITIAL_STATE = {
  profile: {},
  response: '',
  setProfile: false,
  saveProfile: false,
};
const checker = data => {
  if (data === undefined || data.length === 0) {
    return {};
  }
  return data;
};

const allProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: checker(action.payload.profile),
        response: action.payload.messages,
        setProfile: true,
        saveProfile: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: {},
        response: action.payload.errors,
        setProfile: false,
        saveProfile: false,
      };

    default:
      return state;
  }
};
export default allProfile;
