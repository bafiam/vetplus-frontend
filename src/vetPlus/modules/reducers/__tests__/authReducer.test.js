import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../../actions/actionTypes';
import authenticateUser from '../authReducer';

describe('User Booking Reducer', () => {
  const mydata = {
    messages: 'test data',
    user: {
      profile: {
        id: 1,
        location: 'nyeri',
      },
      user_type: 'vet',
    },
  };
  const errData = { errors: 'error test data' };

  it('should return the initial state', () => {
    expect(authenticateUser(undefined, {})).toEqual({
      currentUser: [],
      isLogged: false,
      isUser: false,
      isAdmin: false,
      isVet: false,
      response: [],
    });
  });
  it('should handle LOGIN_USER_SUCCESS', () => {
    const startAction = {
      type: LOGIN_USER_SUCCESS,
      payload: mydata,
    };
    expect(authenticateUser({}, startAction)).toEqual({
      currentUser: {
        profile: {
          id: 1,
          location: 'nyeri',
        },
        user_type: 'vet',
      },
      response: 'test data',
      isLogged: true,
      isUser: false,
      isAdmin: false,
      isVet: true,
    });
  });
  it('should handle LOGIN_USER_ERROR', () => {
    const startAction = {
      type: LOGIN_USER_ERROR,
      payload: errData,
    };
    expect(authenticateUser({}, startAction)).toEqual({
      response: 'error test data',
      currentUser: [],
      isLogged: false,
      isUser: false,
      isAdmin: false,
      isVet: false,
    });
  });
});
