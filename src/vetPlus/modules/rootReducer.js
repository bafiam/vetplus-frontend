import { combineReducers } from 'redux'
import authenticateUser from './reducers/authReducer'
import allProfile from './reducers/profileReducer'
import allVets from './reducers/bookingReducer'
const rootReducer = combineReducers({
  user :authenticateUser,
  profile: allProfile,
  vet: allVets
})

export default rootReducer