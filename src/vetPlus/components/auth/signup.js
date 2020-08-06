import React,  { Component } from "react";
import { Card } from "antd";
import "../../css/auth.css";
import { Form, Input, Tooltip, Button, Cascader } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { signupUser } from "../../modules/reducers/authEffects";
import { connect } from "react-redux";
const residences = [
  {
    value: "user",
    label: "user",
  },
  {
    value: "vet",
    label: "vet",
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
  // form = Form.useForm();

  onFinish = (values) => {
    console.log("Received values of form: ", values);
    this.props.onsignupUser(values)
  };

  render() {
    return (
      <div>
        <Card type="inner" className="right-div-card" title="Sign up">
          <Form
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
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
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
                  type: "array",
                  required: true,
                  message: "Please select your prefered account type",
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password").length > 8) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The password that you entered is too short!"
                    );
                  },
                })
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="nickname"
              label={
                <span>
                  Username&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
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
const mapDispatchToProps = (dispatch) => {
  return {
    onsignupUser: (values) => {
      dispatch(signupUser(values));
    },
  };
};
export default connect(null, mapDispatchToProps)(Signup);
