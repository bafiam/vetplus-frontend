import { combineReducers } from 'redux'
import authenticateUser from './reducers/authReducer'
const rootReducer = combineReducers({
  user :authenticateUser
})

export default rootReducer