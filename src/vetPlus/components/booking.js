import React, { Component } from "react";
import {
  Card,
  Modal,
  Descriptions,
  notification,
  Form,
  List,
  Button,
  Skeleton,
  Input,
  Cascader,
  DatePicker,
} from "antd";

import "../css/profile.css";
import { connect } from "react-redux";
import { getVetsProfile, postBookingProfile } from "../modules/reducers/bookingEffects";
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
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const residences = [
  {
    value: "Video-consultation",
    label: "Video consultation",
  },
  {
    value: "Home-visit",
    label: "Home visit",
  },
  {
    value: "Clinic-visit",
    label: "Clinic visit",
  },
];
class Booking extends Component {
  formRef = React.createRef();
  state = {
    visible: false,
    mydata: {},
    date:{},
    triggered: false
  };
  onCancel = () => {
    this.setVisible(false);
    this.formRef.current.resetFields();
  };
  setVisible = (value) => {
    this.setState({
      visible: value,
    });
  };
  componentDidMount() {
    this.props.onPageLoad();
    if (this.props.profile.setProfile === false) {
      notification["info"]({
        message: `Vet profiles are loading......`,
        description: this.props.profile.response,
        duration: 6,
        placement: "topLeft",
      });
    }
  }
  onApprov = (e, data) => {
    if (data !== undefined) {
      let testData = this.props.vet.vets.filter((arr) => arr.id == data);
      this.setVisible(true);
      this.setState({
        mydata: testData[0],
      });
    }
  };
  onCreate =(value) => {
    let data = {
      appointment:{
        booking_type:value.user_type[0],
        date:this.state.date._d,
        vet:this.state.mydata.id 
      }
    }
    this.props.addBooking(data)
    this.setState({
      triggered: true,
    });
    
  }
  onOk = (value) => {
    this.setState({
      date: value
    });
  }
  render() {
    const { visible, mydata } = this.state;

    if (
      this.props.user.isLogged === undefined ||
      this.props.user.isLogged === false
    ) {
      notification["warning"]({
        message:
          "System resume failed, if it doesnt resume in a few, try to login again",
        description: this.props.vet.response,
        duration: 10,
        placement: "bottomRight",
      });
      this.props.history.push("/auth");
    }
    if (this.state.triggered === true && this.props.vet.bookingSaved === true) {
      notification["success"]({
        message:
          "Add a Booking",
        description: this.props.vet.new_response,
        duration: 10,
        placement: "bottomRight",
      });
      
    }
    if (this.state.triggered === true && this.props.vet.bookingSaved === false) {
      notification["warning"]({
        message:
          "Add a Booking",
        description: this.props.vet.new_response,
        duration: 10,
        placement: "bottomRight",
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
                dataSource={this.props.vet.vets}
                renderItem={(item) => (
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
                      onClick={(e) => this.onApprov(e, item.id)}
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
                        type: "array",
                        required: true,
                        message: "Please select your prefered appointment type",
                      },
                    ]}
                  >
                    <Cascader options={residences} />
                  </Form.Item>

                  <Form.Item
                    name="date-time-picker"
                    label="Schedule time"
                    {...config}
                  >
                    <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime onOk={this.onOk}/>
                    
                  </Form.Item>

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
            <div></div>
          </div>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    vet: state.vet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => {
      dispatch(getVetsProfile());
    },
    addBooking: (value) => {
      dispatch(postBookingProfile(value))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
