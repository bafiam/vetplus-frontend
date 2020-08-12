import React, { Component } from 'react';
import {
  Card, Descriptions, List, notification, message, Divider,
} from 'antd';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBookings } from '../modules/reducers/myBookingEffect';

class UserBooking extends Component {
  componentDidMount() {
    const { bookings, onPageLoad } = this.props;
    onPageLoad();
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
      notification.warning({
        message:
          'System resume failed, if it doesnt resume in a few, try to login again',
        description: user.response,
        duration: 10,
        placement: 'bottomRight',
      });
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
  bookings: PropTypes.shape({
    Appointments: PropTypes.shape({
      date: PropTypes.string,
      length: PropTypes.func,
      booking_type: PropTypes.string,
      profile: PropTypes.shape({
        first_name: PropTypes.string,
      }),
      vet: PropTypes.shape({
        first_name: PropTypes.string,
        second_name: PropTypes.string,
        tel_number: PropTypes.string,
        vet_number: PropTypes.string,
        location: PropTypes.string,
      }),
    }),
    response: PropTypes.string,
    loading: PropTypes.bool,

  }),

  onPageLoad: PropTypes.func,
  history: PropTypes.string,
  user: PropTypes.shape({
    isLogged: PropTypes.bool,
    response: PropTypes.string,
  }),
};
UserBooking.defaultProps = {
  bookings: PropTypes.shape({
    Appointments: PropTypes.shape({
      date: '',
      length: () => {},
      booking_type: '',
      profile: PropTypes.shape({
        first_name: '',
      }),
      vet: PropTypes.shape({
        first_name: '',
        second_name: '',
        tel_number: '',
        vet_number: '',
        location: '',
      }),
    }),
    response: '',
    loading: false,

  }),

  onPageLoad: () => {},
  history: PropTypes.string,
  user: PropTypes.shape({
    isLogged: false,
    response: '',
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(UserBooking);
