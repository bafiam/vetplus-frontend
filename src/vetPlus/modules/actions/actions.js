import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  MAP_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  MAP_USER_ERROR,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  VET_SUCCESS,
  VET_ERROR, 
  BOOKING_SUCCESS,
  BOOKING_ERROR,
  GET_BOOKING_SUCCESS,
  GET_BOOKING_ERROR
} from './actionTypes'

export const GetBookSuccess = (profileObj) => ({
  type: GET_BOOKING_SUCCESS,
  payload: profileObj
})

export const GetBookError = (err) => ({
  type: GET_BOOKING_ERROR,
  payload: err
})

export const BookSuccess = (profileObj) => ({
  type: BOOKING_SUCCESS,
  payload: profileObj
})

export const BookError = (err) => ({
  type: BOOKING_ERROR,
  payload: err
})
export const VetSuccess = (profileObj) => ({
  type: VET_SUCCESS,
  payload: profileObj
})

export const VetError = (err) => ({
  type: VET_ERROR,
  payload: err
})

export const ProfileSuccess = (profileObj) => ({
  type: PROFILE_SUCCESS,
  payload: profileObj
})

export const ProfileError = (err) => ({
  type: PROFILE_ERROR,
  payload: err
})

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
export const logoutUserSuccess = (userObj) => ({
  type: LOGOUT_USER_SUCCESS,
  payload: userObj
})