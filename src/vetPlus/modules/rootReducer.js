import { combineReducers } from 'redux'
import authenticateUser from './reducers/authReducer'
import allProfile from './reducers/profileReducer'
const rootReducer = combineReducers({
  user :authenticateUser,
  profile: allProfile
})

export default rootReducer