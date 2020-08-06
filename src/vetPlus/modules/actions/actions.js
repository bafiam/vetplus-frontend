import {LOGIN_USER_SUCCESS, LOGIN_USER_ERROR} from './actionTypes'


export const loginUserSuccess = (userObj) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userObj
})

export const loginUserError = (err) => ({
  type: LOGIN_USER_ERROR,
  payload: err
})
