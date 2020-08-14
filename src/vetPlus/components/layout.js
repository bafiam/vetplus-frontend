import React, { Component } from 'react';
import {
  Layout, Menu, Avatar, notification, Button,
} from 'antd';
import '../css/layout.css';
import {
  DesktopOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashbaord from './dashbaord';
import Profile from './profile';
import { getUser, logOutUser } from '../modules/reducers/authEffects';
import sendBooking from './booking';
import UserBooking from './userbookings';
import VetBooking from './vetbookings';

const {
  Header, Content, Footer, Sider,
} = Layout;

class PageLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,

    };
    this.onClick = this.onClick.bind(this);
    this.onCollapse = this.onCollapse.bind(this);
  }

  componentDidMount() {
    const {
      onPageUser,
    } = this.props;
    const getToken = localStorage.getItem('vet_token');
    setTimeout(() => {
      onPageUser(getToken);
    }, 2500);
  }

  onClick() {
    const {
      goodByeUser, user, history,
    } = this.props;
    setTimeout(() => {
      goodByeUser();
      notification.success({
        message: 'Good bye',
        description: user.response,
        duration: 10,
        placement: 'bottomRight',
      });
    });

    history.push('/auth');
  }

  onCollapse(collapsed) {
    this.setState({ collapsed });
  }

  render() {
    const {
      user, history,
    } = this.props;
    if (
      user.isLogged === undefined
      || user.isLogged === false
    ) {
      notification.warning({
        message:
          'System resume failed, if it doesnt resume in a few, try to login again',
        description: user.response,
        duration: 20,
        placement: 'bottomRight',
      });
      history.push('/auth');
    }
    let userBook;
    let myAppointments;

    let vetAppointments;
    if (user.isUser === true) {
      userBook = (

        <Menu.Item key="3" icon={<UserSwitchOutlined />}>
          <Link to="/home/book">Book Appointment</Link>
        </Menu.Item>

      );
    }
    if (user.isUser === true) {
      myAppointments = (

        <Menu.Item key="4" icon={<DesktopOutlined />}>
          <Link to="/home/bookings">My Appointments</Link>
        </Menu.Item>

      );
    }
    if (user.isVet === true) {
      vetAppointments = (
        <Menu.Item key="5" icon={<DesktopOutlined />}>
          <Link to="/home/patients">Patients Appointments</Link>
        </Menu.Item>
      );
    }
    const { collapsed } = this.state;

    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/home/dash">Dashbaord</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ProfileOutlined />}>
                <Link to="/home/profile">Profile</Link>
              </Menu.Item>
              {userBook}
              {vetAppointments}
              {myAppointments}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="page-header">
                <div className="logo-name">vet plus</div>
                <div className="avatar">
                  <Avatar
                    style={{ backgroundColor: '#87d068', marginRight: 15 }}
                    icon={<UserOutlined />}
                  />
                  <Button
                    onClick={() => this.onClick()}
                    shape="round"
                    icon={<LogoutOutlined />}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  <Route path="/home/dash" component={Dashbaord} />
                  <Route path="/home/profile" component={Profile} />
                  <Route path="/home/book" component={sendBooking} />
                  <Route path="/home/bookings" component={UserBooking} />
                  <Route path="/home/patients" component={VetBooking} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              bafiam ©2020 Created by @bafiam-github
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onPageUser: values => {
    dispatch(getUser(values));
  },
  goodByeUser: () => {
    dispatch(logOutUser());
  },
});
PageLayout.propTypes = {

  goodByeUser: PropTypes.func,
  onPageUser: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.shape({
    isLogged: PropTypes.bool,
    isUser: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isVet: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    response: PropTypes.any,
  }),
};
PageLayout.defaultProps = {

  onPageUser: () => {},
  goodByeUser: () => {},
  history: PropTypes.objectOf(PropTypes.any),
  user: PropTypes.shape({
    isLogged: false,
    response: '',
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
