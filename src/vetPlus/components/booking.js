import React, { Component } from 'react';
import {
  Card,
  Modal,
  Descriptions,
  notification,
  Form,
  List,
  Button,
  Skeleton,
  Cascader,
  DatePicker,
} from 'antd';

import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVetsProfile, postBookingProfile } from '../modules/reducers/bookingEffects';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const residences = [
  {
    value: 'Video-consultation',
    label: 'Video consultation',
  },
  {
    value: 'Home-visit',
    label: 'Home visit',
  },
  {
    value: 'Clinic-visit',
    label: 'Clinic visit',
  },
];

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      mydata: {},
      date: {},
      triggered: false,
    };
    this.formRef = React.createRef();
    this.onApprov = this.onApprov.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onOk = this.onOk.bind(this);
    this.setVisible = this.setVisible.bind(this);
  }

  componentDidMount() {
    const {
      onPageLoad, profile,
    } = this.props;
    onPageLoad();
    if (profile.setProfile === false) {
      notification.info({
        message: 'Vet profiles are loading......',
        description: profile.response,
        duration: 6,
        placement: 'topLeft',
      });
    }
  }

  onCancel() {
    this.setVisible(false);
    this.formRef.current.resetFields();
  }

  onApprov(e, data) {
    const {
      vet,
    } = this.props;
    if (data !== undefined) {
      const testData = vet.vets.filter(arr => arr.id === data);
      this.setVisible(true);
      this.setState({
        mydata: testData[0],
      });
    }
  }

  onCreate(value) {
    const { date, mydata } = this.state;
    const {
      addBooking,
    } = this.props;
    const data = {
      appointment: {
        booking_type: value.user_type[0],
        // eslint-disable-next-line no-underscore-dangle
        date: date._d,
        vet: mydata.id,
      },
    };
    addBooking(data);
    this.setState({
      triggered: true,
    });
  }

  onOk(value) {
    this.setState({
      date: value,
    });
  }

  setVisible(value) {
    this.setState({
      visible: value,
    });
  }

  render() {
    const { visible, mydata, triggered } = this.state;
    const {
      vet, user, history,
    } = this.props;

    if (user.isLogged === undefined || user.isLogged === false) {
      notification.warning({
        message:
          'System resume failed, if it doesnt resume in a few, try to login again',
        description: vet.response,
        duration: 10,
        placement: 'bottomRight',
      });
      history.push('/auth');
    }
    if (triggered === true && vet.bookingSaved === true) {
      notification.success({
        message: 'Add a Booking',
        description: vet.new_response,
        duration: 10,
        placement: 'bottomRight',
      });
    }
    if (triggered === true && vet.bookingSaved === false) {
      notification.warning({
        message: 'Add a Booking',
        description: vet.new_response,
        duration: 10,
        placement: 'bottomRight',
      });
    }

    return (
      <div>
        <Card title="Booking Appointments">
          <div className="site-card-border-less-wrapper">
            <Card type="inner" title="Vets profile">
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={vet.vets}
                renderItem={item => (
                  <List.Item>
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <Descriptions layout="vertical">
                        <Descriptions.Item label="First name">
                          {item.first_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Second name">
                          {item.second_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Location">
                          {item.location}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone number">
                          {item.tel_number}
                        </Descriptions.Item>
                        <Descriptions.Item label="Licence number">
                          {item.vet_number}
                        </Descriptions.Item>
                        <Descriptions.Item label="Account status">
                          {item.approved_status}
                        </Descriptions.Item>
                      </Descriptions>
                    </Skeleton>
                    <Button
                      type="dashed"
                      danger
                      onClick={e => this.onApprov(e, item.id)}
                    >
                      Book Appointment
                    </Button>
                  </List.Item>
                )}
              />
              <Modal
                visible={visible}
                title="Booking"
                cancelText="Cancel"
                onCancel={this.onCancel}
                okText="Done"
                onOk={this.onCancel}
              >
                <div>
                  <Descriptions layout="vertical" title="Vet">
                    <Descriptions.Item label="First name">
                      {mydata.first_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Second name">
                      {mydata.second_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Location">
                      {mydata.location}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone number">
                      {mydata.tel_number}
                    </Descriptions.Item>
                    <Descriptions.Item label="Licence number">
                      {mydata.vet_number}
                    </Descriptions.Item>
                    <Descriptions.Item label="Account status">
                      {mydata.approved_status}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <Form
                // eslint-disable-next-line react/jsx-props-no-spreading
                  {...formItemLayout}
                  ref={this.formRef}
                  name="time_related_controls"
                  className="edit-form"
                  onFinish={this.onCreate}
                  scrollToFirstError
                >
                  <Form.Item
                    name="user_type"
                    label="Appointment Type"
                    rules={[
                      {
                        type: 'array',
                        required: true,
                        message: 'Please select your prefered appointment type',
                      },
                    ]}
                  >
                    <Cascader options={residences} />
                  </Form.Item>

                  <Form.Item
                    name="date-time-picker"
                    label="Schedule time"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...config}
                  >
                    <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime
                      onOk={this.onOk}
                    />
                  </Form.Item>

                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="edit-form-button"
                    >
                      Book
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Card>
            <div />
          </div>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  vet: state.vet,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => {
    dispatch(getVetsProfile());
  },
  addBooking: value => {
    dispatch(postBookingProfile(value));
  },
});
Booking.propTypes = {
  profile: PropTypes.shape({
    setProfile: PropTypes.bool,
    response: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),

  }),
  vet: PropTypes.shape({
    vets: PropTypes.shape({
      first_name: PropTypes.string,
      second_name: PropTypes.string,
      tel_number: PropTypes.string,
      location: PropTypes.string,
      approved_status: PropTypes.string,
      vet_number: PropTypes.string,
      filter: PropTypes.func,

    }),
    response: PropTypes.string,
    new_response: PropTypes.string,
    bookingSaved: PropTypes.bool,

  }),
  onPageLoad: PropTypes.func,
  addBooking: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.shape({
    isLogged: PropTypes.bool,
    response: PropTypes.string,

  }),
};
Booking.defaultProps = {
  profile: PropTypes.shape({
    setProfile: false,
    response: '',
  }),
  vet: PropTypes.shape({
    vets: PropTypes.shape({
      first_name: '',
      second_name: '',
      tel_number: '',
      location: '',
      approved_status: false,
      vet_number: '',

    }),
    response: '',
  }),

  onPageLoad: () => {},
  addBooking: () => {},
  history: '/auth',
  user: PropTypes.shape({
    currentUser: PropTypes.shape({
      username: '',
      user_type: '',
    }),
    isLogged: false,
    response: '',

  }),

};
const sendBooking = connect(mapStateToProps, mapDispatchToProps)(Booking);
export default sendBooking;
