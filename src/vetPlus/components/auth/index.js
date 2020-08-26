import React from 'react';
import { Card, Button } from 'antd';
import { Route, Link, Switch } from 'react-router-dom';
import '../../css/auth.css';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import Signup from './signup';
import Login from './login';

const Auth = () => (
  <div className="auth-parent">
    <div className="left-div">
      <Card className="left-div-card">
        <Link to="/auth/signup">
          <Button
            size="large"
            shape="round"
            icon={<UserAddOutlined />}
            className="btn"
          >
            Registration
          </Button>
        </Link>
        <Link to="/auth">
          <Button
            size="large"
            shape="round"
            icon={<LoginOutlined />}
            className="btn"
          >
            Login
          </Button>
        </Link>
      </Card>
    </div>
    <div className="right-div">
      <Switch>
        <Route path="/auth" exact component={Login} />
        <Route path="/auth/signup" component={Signup} />
      </Switch>
    </div>
  </div>
);
export default Auth;
