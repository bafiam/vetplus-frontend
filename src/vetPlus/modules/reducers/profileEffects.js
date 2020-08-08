import {ProfileSuccess,ProfileError} from '../actions/actions';

export const getUserProfile = () => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");

    axios
      .get(`http://localhost:3000/api/v1/profile/`, {
        headers: {
          'Authorization': `Basic ${getToken}`
        }
      })
      .then(res => {
        if (res.data.status === "SUCCESS"){
          setTimeout(() => {
          
        dispatch(ProfileSuccess(res.data));
        }, 2500)

        }
        if (res.data.status === "FAIL"){
        setTimeout(() => {
        dispatch(ProfileError(res.data));
        }, 2500)
        }

      })
      .catch(err => {
        dispatch(ProfileError(err));
        
      });
      
  };
};
export const getVetProfile = () => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");

    axios
      .get(`http://localhost:3000/api/v1/vet/`, {
        headers: {
          'Authorization': `Basic ${getToken}`
        }
      })
      .then(res => {
        if (res.data.status === "SUCCESS"){
          setTimeout(() => {
          
        dispatch(ProfileSuccess(res.data));
        }, 2500)

        }
        if (res.data.status === "FAIL"){
        setTimeout(() => {
        dispatch(ProfileError(res.data));
        }, 2500)
        }

      })
      .catch(err => {
        dispatch(ProfileError(err));
        
      });
      
  };
};
