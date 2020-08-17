import {
  VET_SUCCESS,
  BOOKING_SUCCESS,
  GET_BOOKING_SUCCESS,
} from '../actionTypes';
import { GetBookSuccess, BookSuccess, VetSuccess } from '../actions';

describe('Test actions Reducers', () => {
  const data = [{ name: 'stephen' }];

  test('should return data with a defined GET_BOOKING_SUCCESS type  and stephen as payload', () => {
    const test = GetBookSuccess(data);
    expect(test.type).toBe(GET_BOOKING_SUCCESS);
    expect(test.payload[0].name).toBe('stephen');
  });
  test('should return data with a defined BOOKING_SUCCESS type  and stephen as payload', () => {
    const test = BookSuccess(data);
    expect(test.type).toBe(BOOKING_SUCCESS);
    expect(test.payload[0].name).toBe('stephen');
  });
  test('should return data with a defined VET_SUCCESS type  and stephen as payload', () => {
    const test = VetSuccess(data);
    expect(test.type).toBe(VET_SUCCESS);
    expect(test.payload[0].name).toBe('stephen');
  });
});
