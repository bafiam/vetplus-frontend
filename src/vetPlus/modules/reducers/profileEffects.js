import axios from 'axios';
import { ProfileSuccess, ProfileError, BASE_URL } from '../actions/actions';

export const getUserProfile = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');

  axios
    .get(`${BASE_URL}/api/v1/profile/`, {
      headers: {
        Authorization: `Basic ${getToken}`,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(ProfileSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(ProfileError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(ProfileError(err));
    });
};
export const postUserProfile = ({
  firstname, secondname, phone, location, prefix,
}) => dispatch => {
  const getToken = localStorage.getItem('vet_token');
  const profile = {
    profile: {
      first_name: firstname,
      second_name: secondname,
      tel_number: prefix.concat(phone),
      location,
    },
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${getToken}`,
  };

  axios
    .post(`${BASE_URL}/api/v1/profile/`, profile, {
      headers,

    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(ProfileSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(ProfileError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(ProfileError(err));
    });
};
export const getVetProfile = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');

  axios
    .get(`${BASE_URL}/api/v1/vet/`, {
      headers: {
        Authorization: `Basic ${getToken}`,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(ProfileSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(ProfileError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(ProfileError(err));
    });
};

export const postVetProfile = ({
  firstname, secondname, phone, location, licence, prefix,
}) => dispatch => {
  const getToken = localStorage.getItem('vet_token');
  const profile = {
    profile: {
      first_name: firstname,
      second_name: secondname,
      tel_number: prefix.concat(phone),
      location,
      vet_number: licence,
      approved_status: 'No',
    },
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${getToken}`,
  };

  axios
    .post(`${BASE_URL}/api/v1/vet/`, profile, {
      headers,

    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(ProfileSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(ProfileError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(ProfileError(err));
    });
};
export const adminUpdateProfile = id => dispatch => {
  const getToken = localStorage.getItem('vet_token');
  const data = {
    status: {
      id,
    },
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${getToken}`,
  };
  const param = id;

  axios
    .put(`${BASE_URL}/api/v1/admin/${param}`, data, {
      headers,

    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(ProfileSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(ProfileError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(ProfileError(err));
    });
};
export const getUnapprovedVet = () => dispatch => {
  const getToken = localStorage.getItem('vet_token');

  axios
    .get(`${BASE_URL}/api/v1/admin/`, {
      headers: {
        Authorization: `Basic ${getToken}`,
      },
    })
    .then(res => {
      if (res.data.status === 'SUCCESS') {
        setTimeout(() => {
          dispatch(ProfileSuccess(res.data));
        }, 2500);
      }
      if (res.data.status === 'FAIL') {
        setTimeout(() => {
          dispatch(ProfileError(res.data));
        }, 2500);
      }
    })
    .catch(err => {
      dispatch(ProfileError(err));
    });
};
