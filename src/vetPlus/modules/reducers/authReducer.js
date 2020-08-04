import {LOGIN_USER} from './../actions/actionTypes'


const INITIAL_STATE = {
  currentUser: {},
  token: {}
};

const authenticateUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token
      };
    default:
      return state;
  }
};

export default authenticateUser