import React, { Component } from 'react';
import {
  Button, Modal, Form, Input, notification, Select,
} from 'antd';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postVetProfile } from '../modules/reducers/profileEffects';

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
const { Option } = Select;
const prefixSelector = (

  <Form.Item
    name="prefix"
    noStyle
    rules={[
      {
        required: true,
        message: 'Please input your phone prefix!',
      },
    ]}
  >
    <Select style={{ width: 90 }}>
      <Option value="254">+254</Option>

    </Select>
  </Form.Item>

);
const formRef = React.createRef();

class EditVetprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  onCreate(values) {
    const { profile, onPageSubmit } = this.props;
    onPageSubmit(values);
    this.setVisible(true);
    if (profile.saveProfile === false) {
      notification.info({
        message: 'Saving profile data..',
        description: profile.response,
        duration: 6,
        placement: 'topLeft',
      });
    }
    if (profile.saveProfile === true) {
      notification.success({
        message: 'profile saved successfully',
        description: profile.response,
        duration: 6,
        placement: 'topLeft',
      });
    }
  }

  onCancel() {
    this.setVisible(false);
    formRef.current.resetFields();
  }

  setVisible(value) {
    this.setState({
      visible: value,
    });
  }

  render() {
    const { visible } = this.state;

    return (
      <div className="edit-div">
        <Button
          type="primary"
          onClick={() => {
            this.setVisible(true);
          }}
        >
          Create vet profile
        </Button>
        <Modal
          visible={visible}
          title="Update profile"
          cancelText="Cancel"
          onCancel={this.onCancel}
          okText="Done"
          onOk={this.onCancel}
        >
          <Form
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...formItemLayout}
            ref={formRef}
            name="normal_edit"
            className="edit-form"
            onFinish={this.onCreate}
            scrollToFirstError
          >
            <Form.Item
              label="First name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Please input your first name!',
                },
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              label="Second name"
              name="secondname"
              rules={[
                {
                  required: true,
                  message: 'Please input your second name!',
                },
              ]}
            >
              <Input placeholder="Second name" />
            </Form.Item>
            <Form.Item

              name="phone"
              label="Phone Number"
              wrapperCol={{ span: 128 }}
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: 'Please input your location!',
                },
              ]}
            >
              <Input placeholder="Location" />
            </Form.Item>

            <Form.Item
              label="Licence number"
              name="licence"
              rules={[
                {
                  required: true,
                  message: 'Please input your licence number!',
                },
              ]}
            >
              <Input placeholder="Licence number" />
            </Form.Item>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="edit-form-button"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  onPageSubmit: values => {
    dispatch(postVetProfile(values));
  },
});
EditVetprofile.propTypes = {
  profile: PropTypes.shape({
    saveProfile: PropTypes.bool,
    response: PropTypes.string,
  }),
  onPageSubmit: PropTypes.func,

};
EditVetprofile.defaultProps = {
  profile: PropTypes.shape({
    saveProfile: false,
    response: '',
  }),
  onPageSubmit: () => {},

};
export default connect(mapStateToProps, mapDispatchToProps)(EditVetprofile);
