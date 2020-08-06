import React, { Component } from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../../css/auth.css";
import {loginUser} from '../../modules/reducers/authEffects'
import { connect } from 'react-redux';
class Login extends Component {

  onFinish = values => {
    console.log('Received values of form: ', values);
    this.props.onloginUser(values)
  };


  render() {
    return (
      <Card className="right-div-card" title="Login" type="inner" >
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
                  message: "Please input your Username!",
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
                  message: "Please input your Password!",
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
const mapDispatchToProps = dispatch => {
  return {
    onloginUser: values => {
      dispatch(loginUser(values));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
