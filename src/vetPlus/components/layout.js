import React, { Component } from "react";
import { Layout, Menu, Avatar } from "antd";
import "../css/layout.css";
import {
  DesktopOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Route, Link, Switch } from "react-router-dom";
import Dashbaord from "./dashbaord";
import Profile from "./profile";
const { Header, Content, Footer, Sider } = Layout;
export default class PageLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
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
                My Appointments
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="page-header">
                <div className="logo-name">vet plus</div>
                <div className="avatar">
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
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
