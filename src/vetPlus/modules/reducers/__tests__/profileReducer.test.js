import { PROFILE_SUCCESS, PROFILE_ERROR } from '../../actions/actionTypes';
import allProfile from '../profileReducer';

describe('User Booking Reducer', () => {
  const mydata = {
    messages: 'test data',
    profile: {
      profile: {
        id: 1,
        location: 'nyeri',
      },
    },
  };
  const data = {
    messages: 'test data',
    profile: {},
  };
  const errData = { errors: 'error test data' };

  it('should return the initial state', () => {
    expect(allProfile(undefined, {})).toEqual({
      profile: {},
      response: '',
      setProfile: false,
      saveProfile: false,
    });
  });
  it('should handle PROFILE_SUCCESS with profile to display', () => {
    const startAction = {
      type: PROFILE_SUCCESS,
      payload: mydata,
    };
    expect(allProfile({}, startAction)).toEqual({
      profile: {
        profile: {
          id: 1,
          location: 'nyeri',
        },
      },
      response: 'test data',
      setProfile: true,
      saveProfile: true,
    });
  });
  it('should handle PROFILE_SUCCESS no profile to display', () => {
    const startAction = {
      type: PROFILE_SUCCESS,
      payload: data,
    };
    expect(allProfile({}, startAction)).toEqual({
      profile: {},
      response: 'test data',
      setProfile: true,
      saveProfile: true,
    });
  });
  it('should handle PROFILE_ERROR', () => {
    const startAction = {
      type: PROFILE_ERROR,
      payload: errData,
    };
    expect(allProfile({}, startAction)).toEqual({
      profile: {},
      response: 'error test data',
      setProfile: false,
      saveProfile: false,
    });
  });
});
