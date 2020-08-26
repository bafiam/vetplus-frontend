import React, { Component } from 'react';
import {
  Card,
  Descriptions,
  List,
  message,
  Divider,
} from 'antd';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVetBookings } from '../modules/reducers/myBookingEffect';

class VetBooking extends Component {
  componentDidMount() {
    const {
      bookings, onPageLoad,
    } = this.props;
    onPageLoad();
    if (bookings.loading === false) {
      message.warning('Fetching Appointments');
    }
    if (bookings.loading === true) {
      message.success(`${bookings.response}`);
    }
  }

  render() {
    const {
      bookings, user, history,
    } = this.props;
    if (
      user.isLogged === undefined
      || user.isLogged === false
    ) {
      history.push('/auth');
    }
    let appointments;
    if (bookings.Appointments.length <= 0) {
      appointments = (
        <Card title="Appointments booked by patients" style={{ width: 300 }}>
          <p>You have no pending or upcomming appointments requests </p>
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
                    xxl: 6, xl: 6, lg: 5, md: 3, sm: 2, xs: 1,
                  }}
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
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  bookings: state.bookings,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => {
    dispatch(getVetBookings());
  },
});
VetBooking.propTypes = {
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
VetBooking.defaultProps = {
  bookings: PropTypes.objectOf({
    Appointments: [],
    response: '',
    loading: false,

  }),

  onPageLoad: () => {},
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.shape({
    isLogged: false,
    response: [],
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(VetBooking);
