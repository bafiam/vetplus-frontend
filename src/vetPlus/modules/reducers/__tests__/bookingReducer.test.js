import {
  VET_SUCCESS,
  VET_ERROR,
  BOOKING_SUCCESS,
  BOOKING_ERROR,
} from "../../actions/actionTypes";
import allVets from "../bookingReducer";

describe("User Booking Reducer", () => {
  const mydata = {
    messages: "test data",
    profile: {
      profile: {
        id: 1,
        location: "nyeri",
      },
    },
  };
  const err_data = { errors: "error test data" };

  it("should return the initial state", () => {
    expect(allVets(undefined, {})).toEqual({
      vets: [],
      response: "",
      setProfile: false,
      bookingSaved: false,
      new_response: "",
    });
  });
  it("should handle VET_SUCCESS", () => {
    const startAction = {
      type: VET_SUCCESS,
      payload: mydata,
    };
    expect(allVets({},startAction)).toEqual({
      vets: {
        profile: {
          id: 1,
          location: "nyeri",
        },
      },
      response: "test data",
      setProfile: true,
    });
  });
  it("should handle VET_ERROR", () => {
    const startAction = {
      type: VET_ERROR,
      payload: err_data,
    };
    expect(allVets({},startAction)).toEqual({
      vets: [],
      response: "error test data",
      setProfile: false,
    });
  });
  it("should handle BOOKING_SUCCESS", () => {
    const startAction = {
      type: BOOKING_SUCCESS,
      payload: mydata,
    };
    expect(allVets({},startAction)).toEqual({
      new_response: "test data",
      bookingSaved: true,
    });
  });
  it("should handle BOOKING_ERROR", () => {
    const startAction = {
      type: BOOKING_ERROR,
      payload: err_data,
    };
    expect(allVets({},startAction)).toEqual({

      new_response: "error test data",
      bookingSaved: false,
    });
  });
});
