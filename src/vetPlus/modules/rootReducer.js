import { combineReducers } from 'redux'
import authenticateUser from './reducers/authReducer'
const rootReducer = combineReducers({
  authenticateUser
})

export default rootReducer