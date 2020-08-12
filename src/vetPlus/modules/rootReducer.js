import { combineReducers } from 'redux';
import authenticateUser from './reducers/authReducer';
import allProfile from './reducers/profileReducer';
import allVets from './reducers/bookingReducer';
import myBookings from './reducers/myBookingReducer';

const rootReducer = combineReducers({
  user: authenticateUser,
  profile: allProfile,
  vet: allVets,
  bookings: myBookings,
});

export default rootReducer;
