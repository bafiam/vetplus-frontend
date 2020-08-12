import axios from 'axios';
import {
  loginUserSuccess, loginUserError, getUserSuccess, getUserError, logoutUserSuccess, BASE_URL,
} from '../actions/actions';

export const loginUser = ({ username, password }) => dispatch => {
  axios
    .post(`${BASE_URL}/api/v1/login`, {
      user: {
        username,
        password,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          localStorage.setItem('vet_token', res.data.jwt);
          dispatch(loginUserSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(loginUserError(res.data));
        }, 2500);
      }
    })

    .catch(err => {
      dispatch(loginUserError(err.message));
    });
};

export const signupUser = ({
  // eslint-disable-next-line camelcase
  email, nickname, password, confirm, user_type,
}) => dispatch => {
  axios
    .post(`${BASE_URL}/api/v1/user`, {
      user: {
        username: nickname,
        password,
        email,
        password_confirmation: confirm,
        user_type: user_type[0],
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          localStorage.setItem('vet_token', res.data.jwt);
          dispatch(loginUserSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(loginUserError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(loginUserError(err));
    });
};
export const getUser = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');
  axios
    .get(`${BASE_URL}/api/v1/login/`, {
      headers: {
        Authorization: `Basic ${getToken}`,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(getUserSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(getUserError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(getUserError(err));
    });
};
export const logOutUser = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');
  axios.get(`${BASE_URL}/api/v1/logout/`, {

    headers: {
      Authorization: `Basic ${getToken}`,
    },
  })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(logoutUserSuccess(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(logoutUserSuccess(err));
    });
};
