import LOGIN_USER from './actionTypes'


export const loginUser = (userObj) => ({
  type: LOGIN_USER,
  payload: userObj
})
