import { GetBookSuccess, GetBookError } from "../actions/actions";
import axios from "axios";

export const getBookings = () => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");

    axios
      .get(`http://localhost:3000/api/v1/patient/`, {
        headers: {
          Authorization: `Basic ${getToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(GetBookSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(GetBookError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
        dispatch(GetBookError(err));
      });
  };
};

export const getVetBookings = () => {
  return (dispatch) => {
    let getToken = localStorage.getItem("vet_token");

    axios
      .get(`http://localhost:3000/api/v1/doctor/`, {
        headers: {
          Authorization: `Basic ${getToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTimeout(() => {
            dispatch(GetBookSuccess(res.data));
          }, 2500);
        }
        if (res.data.status === "FAIL") {
          setTimeout(() => {
            dispatch(GetBookError(res.data));
          }, 2500);
        }
      })
      .catch((err) => {
        dispatch(GetBookError(err));
      });
  };
};