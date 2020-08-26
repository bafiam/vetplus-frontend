import axios from 'axios';
import { GetBookSuccess, GetBookError, BASE_URL } from '../actions/actions';

export const getBookings = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');

  axios
    .get(`${BASE_URL}/api/v1/patient/`, {
      headers: {
        Authorization: `Basic ${getToken}`,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(GetBookSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(GetBookError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(GetBookError(err));
    });
};

export const getVetBookings = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');

  axios
    .get(`${BASE_URL}/api/v1/doctor/`, {
      headers: {
        Authorization: `Basic ${getToken}`,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(GetBookSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(GetBookError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(GetBookError(err));
    });
};
