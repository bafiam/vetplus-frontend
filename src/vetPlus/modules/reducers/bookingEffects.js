import axios from 'axios';
import {
  VetSuccess, VetError, BookSuccess, BookError,
} from '../actions/actions';

export const getVetsProfile = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');

  axios
    .get('http://localhost:3000/api/v1/appointment/', {
      headers: {
        Authorization: `Basic ${getToken}`,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(VetSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(VetError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(VetError(err));
    });
};

export const postBookingProfile = data => dispatch => {
  const getToken = localStorage.getItem('vet_token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${getToken}`,
  };

  axios
    .post('http://localhost:3000/api/v1/appointment/', data, {
      headers,

    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(BookSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(BookError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(BookError(err));
    });
};
