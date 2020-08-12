import React, { Component } from "react";
import {
  Card,
  Descriptions,
  List,
  notification,
  message,
  Divider
} from "antd";
import "../css/profile.css";
import { connect } from "react-redux";
import { getVetBookings } from "../modules/reducers/myBookingEffect";

class VetBooking extends Component {
  componentDidMount() {
    this.props.onPageLoad();
    if (this.props.bookings.loading === false) {
      message.warning("Fetching Appointments");
    }
    if (this.props.bookings.loading === true) {
      message.success(`${this.props.bookings.response}`);
    }
  }

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
    let appointments;
    if (this.props.bookings.Appointments.length <= 0) {
      appointments = (
        <Card title="Appointments booked by patients" style={{ width: 300 }}>
          <p>You have no pending or upcomming appointments requests </p>
        </Card>
      );
    }
    if (this.props.bookings.Appointments.length > 0) {
      appointments = (
        <Card >
          <List
            itemLayout="horizontal"
            dataSource={this.props.bookings.Appointments}
            renderItem={(item) => (
              <div>
                <Descriptions
                  layout="vertical"
                  bordered
                  column={{ xxl: 6, xl: 6, lg: 5, md: 3, sm: 2, xs: 1 }}
                >
                  <Descriptions.Item label="Consultation time">
                    {item.date}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consultation type">
                    {item.booking_type}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vet name">
                    {item.vet.first_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Patient first name">
                    {item.profile.first_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Patient second name">
                    {item.profile.second_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Patient phone-number">
                    {item.profile.tel_number}
                  </Descriptions.Item>
                  <Descriptions.Item label="Patient location">
                    {item.profile.location}
                  </Descriptions.Item>
                </Descriptions>
                <Divider>Consultation</Divider>
              </div>
            )}
          />
        </Card>
      );
    }

    return (
      <div>
        <Card title="My Appointments">
          <div className="site-card-border-less-wrapper">{appointments}</div>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    bookings: state.bookings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => {
      dispatch(getVetBookings());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VetBooking);
