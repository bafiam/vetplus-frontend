import React, { Component } from 'react';
import {
  Card, Descriptions, List, message, Divider,
} from 'antd';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBookings } from '../modules/reducers/myBookingEffect';

class UserBooking extends Component {
  componentDidMount() {
    const { onPageLoad } = this.props;
    onPageLoad();
  }

  componentDidUpdate() {
    const { bookings } = this.props;
    if (bookings.loading === false) {
      message.warning('Fetching Appointments');
    }
    if (bookings.loading === true) {
      message.success(`${bookings.response}`);
    }
  }

  render() {
    const { bookings, user, history } = this.props;
    if (user.isLogged === undefined || user.isLogged === false) {
      history.push('/auth');
    }
    let appointments;
    if (bookings.Appointments.length <= 0) {
      appointments = (
        <Card title="Appointments booked by user" style={{ width: 300 }}>
          <p>You have no pending or upcomming appointments </p>
        </Card>
      );
    }
    if (bookings.Appointments.length > 0) {
      appointments = (
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={bookings.Appointments}
            renderItem={item => (
              <div>
                <Descriptions
                  layout="vertical"
                  bordered
                  column={{
                    xxl: 6,
                    xl: 6,
                    lg: 5,
                    md: 3,
                    sm: 2,
                    xs: 1,
                  }}
                >
                  <Descriptions.Item label="Consultation time">
                    {item.date}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consultation type">
                    {item.booking_type}
                  </Descriptions.Item>
                  <Descriptions.Item label="Patient name">
                    {item.profile.first_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vet first name">
                    {item.vet.first_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vet second name">
                    {item.vet.second_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vet phone-number">
                    {item.vet.tel_number}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vet license no">
                    {item.vet.vet_number}
                  </Descriptions.Item>
                  <Descriptions.Item label="consultation location">
                    {item.vet.location}
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
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  bookings: state.bookings,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => {
    dispatch(getBookings());
  },
});
UserBooking.propTypes = {
  bookings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,

  ])),

  onPageLoad: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,

  ])),
};
UserBooking.defaultProps = {
  bookings: PropTypes.objectOf({
    Appointments: [],
    response: '',
    loading: false,

  }),

  onPageLoad: () => {},
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf({
    isLogged: false,
    response: '',
    currentUser: [],
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(UserBooking);
