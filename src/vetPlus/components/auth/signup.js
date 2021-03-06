import React, { Component } from 'react';
import {
  Card,
  Form,
  Input,
  Tooltip,
  Button,
  Cascader,
  notification,
} from 'antd';
import '../../css/auth.css';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signupUser, getUser } from '../../modules/reducers/authEffects';

const residences = [
  {
    value: 'user',
    label: 'user',
  },
  {
    value: 'vet',
    label: 'vet',
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    const getToken = localStorage.getItem('vet_token');
    if (getToken && Object.keys(getToken).length > 0) {
      setTimeout(() => {
        const { onPageLoad } = this.props;
        onPageLoad(getToken);
      }, 2500);
    }
  }

  componentDidUpdate() {
    const { user, history } = this.props;
    if (user.isLogged !== undefined && user.isLogged === true) {
      notification.success({
        message: `welcome ${user.currentUser.username}`,
        description: user.response,

        placement: 'topRight',
      });
      history.push('/home/dash');
    }
    if (user.isLogged === undefined || user.isLogged === false) {
      if (Array.isArray(user.response)) {
        [...user.response].forEach(element => {
          notification.warning({
            message: 'Registration failed',
            description: element,
            placement: 'bottomLeft',
          });
        });
      } else {
        notification.warning({
          message: 'Registration failed',
          description: user.response,
          placement: 'bottomLeft',
        });
      }
    }
  }

  onFinish(values) {
    const { onsignupUser } = this.props;
    onsignupUser(values);
  }

  render() {
    return (
      <div>
        <Card type="inner" className="right-div-card" title="Sign up">
          <Form
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...formItemLayout}
            name="register"
            onFinish={this.onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user_type"
              label="User Type"
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: 'Please select your prefered account type',
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                { min: 8, message: 'password must be minimum 8 characters.' },

              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },

                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    // eslint-disable-next-line  prefer-promise-reject-errors
                    return Promise.reject(
                      'The two passwords that you entered do not match!',
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="nickname"
              label={(
                <span>
                  Username&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              )}
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onsignupUser: values => {
    dispatch(signupUser(values));
  },
  onPageLoad: value => {
    dispatch(getUser(value));
  },
});
Signup.propTypes = {
  onsignupUser: PropTypes.func,
  onPageLoad: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,

  ])),
};
Signup.defaultProps = {
  onsignupUser: () => {},
  onPageLoad: () => {},
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.objectOf({
    isLogged: false,
    response: '',
    currentUser: [],
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
