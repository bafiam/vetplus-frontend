import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  MAP_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  MAP_USER_ERROR,
  LOGOUT_USER_ERROR
} from './actionTypes'


export const loginUserSuccess = (userObj) => ({
  type: LOGIN_USER_SUCCESS,
  payload: userObj
})

export const loginUserError = (err) => ({
  type: LOGIN_USER_ERROR,
  payload: err
})

export const getUserSuccess = (userObj) => ({
  type: MAP_USER_SUCCESS,
  payload: userObj
})

export const getUserError = (err) => ({
  type: MAP_USER_ERROR,
  payload: err
})