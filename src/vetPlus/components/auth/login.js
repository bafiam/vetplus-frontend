import React, { Component } from "react";
import { Card, Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../../css/auth.css";
import {loginUser, getUser} from '../../modules/reducers/authEffects'
import { connect } from 'react-redux';
class Login extends Component {

  onFinish = values => {
    this.props.onloginUser(values)
  };

  render() {
    if (this.props.user.isLogged !== undefined && this.props.user.isLogged === true){
      notification['success']({
        message: `welcome ${this.props.user.currentUser.username}`,
        description:this.props.user.response,
        duration: 15,
        placement:"topRight"
      });
      this.props.history.push('/home/dash')

    }
    if (this.props.user.isLogged === undefined || this.props.user.isLogged === false){
      let getToken = localStorage.getItem("vet_token");
      this.props.onPageLoad(getToken)
      notification['warning']({
        message: 'Login failed',
        description:this.props.user.response,
        duration: 7,
        placement:"bottomRight"
      });

    }
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
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onloginUser: values => {
      dispatch(loginUser(values));
    },
    onPageLoad: value => {
      dispatch(getUser(value))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
