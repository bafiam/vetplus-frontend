import React, { Component } from 'react';
import {
  Card, Form, Input, Button, Checkbox, notification,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../css/auth.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, getUser } from '../../modules/reducers/authEffects';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const { onPageLoad } = this.props;
      onPageLoad();
    }, 2500);
  }

  onFinish(values) {
    const { onloginUser } = this.props;
    onloginUser(values);
  }

  render() {
    const { user, history } = this.props;
    if (user.isLogged !== undefined) {
      if (user.isLogged === true) {
        notification.success({
          message: `welcome ${user.currentUser.username}`,
          description: user.response,
          duration: 15,
          placement: 'topRight',
        });
        history.push('/home/dash');
      }
      if (user.isLogged === false) {
        notification.warning({
          message: 'Login failed',
          description: user.response,
          duration: 7,
          placement: 'bottomRight',
        });
      }
    }

    return (
      <Card className="right-div-card" title="Login" type="inner">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onloginUser: values => {
    dispatch(loginUser(values));
  },
  onPageLoad: () => {
    dispatch(getUser());
  },
});
Login.propTypes = {
  onloginUser: PropTypes.func,
  onPageLoad: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.shape({
    isLogged: PropTypes.bool,
    isUser: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isVet: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    response: PropTypes.any,
    // eslint-disable-next-line react/forbid-prop-types
    currentUser: PropTypes.any,
  }),
};
Login.defaultProps = {
  onloginUser: () => {},
  onPageLoad: () => {},
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.shape({
    isLogged: false,
    response: '',
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
