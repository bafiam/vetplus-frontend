import myBookings from '../myBookingReducer';
import {
  GET_BOOKING_SUCCESS,
  GET_BOOKING_ERROR,
} from '../../actions/actionTypes';

describe('User Booking Reducer', () => {
  const mydata = {
    messages: 'test data',
    profile:
      {
        profile: {
          id: 1,
          location: 'nyeri',
        },
      },

  };
  const errData = { errors: 'error test data' };
  it('should return the initial state', () => {
    expect(myBookings(undefined, {})).toEqual({
      Appointments: {},
      response: '',
      loading: false,
    });
  });
  it('should handle GET_BOOKING_SUCCESS', () => {
    const startAction = {
      type: GET_BOOKING_SUCCESS,
      payload: mydata,
    };
    expect(myBookings({}, startAction)).toEqual({
      Appointments: {
        profile: {
          id: 1,
          location: 'nyeri',
        },
      },
      response: 'test data',
      loading: true,
    });
  });
  it('should handle GET_BOOKING_ERROR', () => {
    const startAction = {
      type: GET_BOOKING_ERROR,
      payload: errData,
    };
    expect(myBookings({}, startAction)).toEqual({
      Appointments: {},
      response: 'error test data',
      loading: false,
    });
  });
});
