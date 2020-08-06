import { LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./../actions/actionTypes";

const INITIAL_STATE = {
  currentUser: [],
  isLogged: false,
  isUser: false,
  isAdmin: false,
  isVet: false,
  response: [],
  errors: [],
};

const authenticateUser = (user = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...user,
        currentUser: action.payload.user,
        response: action.payload.messages,
        isLogged: true,
        isUser: setUser(action.payload.user.user_type),
        isAdmin: setAdmin(action.payload.user.user_type),
        isVet: setVet(action.payload.user.user_type),
        errors: action.payload.errors
      };
    case LOGIN_USER_ERROR:
      return {
        ...user,
        response: action.payload.errors,
      };

    default:
      return user;
  }
};
const setUser = (data) => {
  if (data !== undefined)
    if (data === "user") {
      return true;
    } else {
      return false;
    }
  else {
    return false;
  }
};
const setAdmin = (data) => {
  if (data !== undefined)
    if (data === "admin") {
      return true;
    } else {
      return false;
    }
  else {
    return false;
  }
};
const setVet = (data) => {
  if (data !== undefined)
    if (data === "vet") {
      return true;
    } else {
      return false;
    }
  else {
    return false;
  }
};

export default authenticateUser;
