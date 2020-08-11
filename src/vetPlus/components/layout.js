import React, { Component } from "react";
import { Layout, Menu, Avatar, notification, Button } from "antd";
import "../css/layout.css";
import {
  DesktopOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined, 
  UserSwitchOutlined
} from "@ant-design/icons";
import { Route, Link, Switch } from "react-router-dom";
import Dashbaord from "./dashbaord";
import Profile from "./profile";
import { connect } from "react-redux";
import { getUser, logOutUser } from "../modules/reducers/authEffects";
import Booking from "./booking"
import UserBooking from './userbookings'
const { Header, Content, Footer, Sider } = Layout;
class PageLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  componentDidMount() {
    let getToken = localStorage.getItem("vet_token");
    setTimeout(() => {
      this.props.onPageUser(getToken);
    }, 2500);
  }
  onClick = () => {
    setTimeout(() => {
      this.props.goodByeUser();
      notification["success"]({
        message: "Good bye",
        description: this.props.user.response,
        duration: 10,
        placement: "bottomRight",
      });
    });

    this.props.history.push("/auth");
  };
  render() {
    if (
      this.props.user.isLogged === undefined ||
      this.props.user.isLogged === false
    ) {
      notification["warning"]({
        message:
          "System resume failed, if it doesnt resume in a few, try to login again",
        description: this.props.user.response,
        duration: 20,
        placement: "bottomRight",
      });
      this.props.history.push("/auth");
    }
    let userBook
    if (this.props.user.isUser === true) {

      userBook = <Menu.Item key="4" icon={<UserSwitchOutlined />}>
        <Link to="/home/book">
          Book Appointment
        </Link>
                
              </Menu.Item>
    }

    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/home/dash">Dashbaord</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ProfileOutlined />}>
                <Link to="/home/profile">Profile</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link to="/home/bookings">My Appointments</Link>
                
              </Menu.Item>
              {userBook}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="page-header">
                <div className="logo-name">vet plus</div>
                <div className="avatar">
                  <Avatar
                    style={{ backgroundColor: "#87d068", marginRight:15 }}
                    icon={<UserOutlined />}
                  />
                  <Button onClick={() => this.onClick()} shape="round" icon={<LogoutOutlined />}>Logout</Button>
                </div>
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  <Route path="/home/dash" component={Dashbaord} />
                  <Route path="/home/profile" component={Profile} />
                  <Route path="/home/book" component={Booking} />
                  <Route path="/home/bookings" component={UserBooking} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              bafiam ©2020 Created by @bafiam-github
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageUser: (values) => {
      dispatch(getUser(values));
    },
    goodByeUser: () => {
      dispatch(logOutUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
