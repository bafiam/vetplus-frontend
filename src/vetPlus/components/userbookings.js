import React, { Component } from 'react'
import { Card, Avatar, Descriptions, notification, Divider, Tag} from "antd";
import "../css/profile.css";
import { connect } from "react-redux";

 class UserBooking extends Component {
  render() {
    if (
      this.props.user.isLogged === undefined ||
      this.props.user.isLogged === false
    ) {
      notification["warning"]({
        message:
          "System resume failed, if it doesnt resume in a few, try to login again",
        description: this.props.user.response,
        duration: 10,
        placement: "bottomRight",
      });
      this.props.history.push("/auth");
    }
    return (
      <div>
        <Card title="My Appointments">
          <div className="site-card-border-less-wrapper">
            Appointments booked by a user
            <div>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile:state.profile
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => {
      dispatch()
    }
  };
};

export default connect(mapStateToProps, null)(UserBooking)