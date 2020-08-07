import {loginUserSuccess, loginUserError, getUserSuccess, getUserError, logoutUserSuccess} from '../actions/actions'
import axios from 'axios';

export const loginUser = ({ username, password }) => {
  return (dispatch, getState) => {
    axios
      .post(`http://localhost:3000/api/v1/login`, {
        user:{
          username:username,
          password:password
        }
      })
      .then(res => {
        if (res.data.status === "SUCCESS"){
          setTimeout(() => {
            localStorage.setItem('vet_token', res.data.jwt);
        dispatch(loginUserSuccess(res.data));
        }, 2500)

        }
        if (res.data.status === "FAIL"){
        setTimeout(() => {
        dispatch(loginUserError(res.data));
        }, 2500)
        }
        console.log('current state:', getState());

      })
      
      .catch(err => {
        dispatch(loginUserError(err.message));
        
      });
      
  };
};

export const signupUser = ({email, nickname, password, confirm, user_type }) => {
  return (dispatch, getState) => {

    axios
      .post(`http://localhost:3000/api/v1/user`, {
        user:{
          username:nickname,
          password:password,
          email:email,
          password_confirmation:confirm,
          user_type:user_type[0]
        }
      })
      .then(res => {
        if (res.data.status === "SUCCESS"){
          setTimeout(() => {
            localStorage.setItem('vet_token', res.data.jwt);
        dispatch(loginUserSuccess(res.data));
        }, 2500)

        }
        if (res.data.status === "FAIL"){
        setTimeout(() => {
        dispatch(loginUserError(res.data));
        }, 2500)
        }

      })
      .catch(err => {
        dispatch(loginUserError(err));
        
      });
      console.log('current err data:', getState())
      
  };
};
export const getUser = (token) => {
  return (dispatch, getState) => {

    axios
      .get(`http://localhost:3000/api/v1/login/`, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
      .then(res => {
        if (res.data.status === "SUCCESS"){
          setTimeout(() => {
          
        dispatch(getUserSuccess(res.data));
        }, 2500)

        }
        if (res.data.status === "FAIL"){
        setTimeout(() => {
        dispatch(getUserError(res.data));
        }, 2500)
        }

      })
      .catch(err => {
        dispatch(getUserError(err));
        
      });
      console.log('current err data:', getState())
      
  };
};
export const logOutUser = () => {
  
  return (dispatch, getState) => {
    let getToken = localStorage.getItem("vet_token");
    axios.get(`http://localhost:3000/api/v1/logout/`, {
    
        headers: {
          'Authorization': `Basic ${getToken}`
        }
      })
      .then(res => {
        if (res.data.status === "SUCCESS"){
          setTimeout(() => {
        dispatch(logoutUserSuccess(res.data));
        }, 2500)

        }

      })
      .catch(err => {
        dispatch(logoutUserSuccess(err));
        
      });
      
  };
};