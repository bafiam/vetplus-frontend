import { ProfileSuccess, ProfileError } from "../actions/actions";
import axios from "axios";
export const getUserProfile = () => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");

    axios
      .get(`http://localhost:3000/api/v1/profile/`, {
        headers: {
          Authorization: `Basic ${getToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(ProfileSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(ProfileError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
        dispatch(ProfileError(err));
      });
  };
};
export const postUserProfile = ({firstname, secondname, phone, location, prefix}) => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");
    const profile = {
      profile:{
        first_name: firstname,
        second_name: secondname,
        tel_number: prefix.concat(phone),
        location: location,
        }
      }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${getToken}`
    }

    axios
      .post(`http://localhost:3000/api/v1/profile/`, profile, {
        "headers": headers
 
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(ProfileSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(ProfileError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
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
          Authorization: `Basic ${getToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(ProfileSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(ProfileError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
        dispatch(ProfileError(err));
      });
  };
};

export const postVetProfile = ({firstname, secondname, phone, location, licence, prefix}) => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");
    const profile = {
      profile:{
        first_name: firstname,
        second_name: secondname,
        tel_number: prefix.concat(phone),
        location: location,
        vet_number:licence,
        approved_status: "No"
        }
      }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${getToken}`
    }
  

    axios
      .post(`http://localhost:3000/api/v1/vet/`, profile, {
        "headers": headers
       
        
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(ProfileSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(ProfileError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
        dispatch(ProfileError(err));
      });
  };
};
export const adminUpdateProfile = (id) => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");
    const data = {
      status:{
        id:id
        }
      }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${getToken}`
    }
    let param = id
  

    axios
      .put(`http://localhost:3000/api/v1/admin/${param}`, data, {
        "headers": headers
       
        
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(ProfileSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(ProfileError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
        dispatch(ProfileError(err));
      });
  };
};
export const getUnapprovedVet = () => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");

    axios
      .get(`http://localhost:3000/api/v1/admin/`, {
        headers: {
          Authorization: `Basic ${getToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(ProfileSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(ProfileError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
        dispatch(ProfileError(err));
      });
  };
};