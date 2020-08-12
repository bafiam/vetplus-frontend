import React, { Component } from 'react';
import {
  Card, Avatar, Descriptions, notification, Divider, Tag,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserProfile } from '../modules/reducers/profileEffects';

class UserProfile extends Component {
  componentDidMount() {
    const {
      profile, onPageLoad,
    } = this.props;
    onPageLoad();
    if (profile.setProfile === false) {
      notification.info({
        message: 'Your profile is loading......',
        description: profile.response,
        duration: 6,
        placement: 'topLeft',
      });
    }
  }

  render() {
    const {
      profile, user, history,
    } = this.props;
    const isEmpty = 'N/A';
    if (profile.setProfile === true) {
      notification.success({
        message: `Your profile is ready ${user.currentUser.username}`,
        description: profile.response,
        duration: 2,
        placement: 'topLeft',
      });
    }
    if (
      user.isLogged === undefined
      || user.isLogged === false
    ) {
      notification.warning({
        message:
          'System resume failed, if it doesnt resume in a few, try to login again',
        description: user.response,
        duration: 10,
        placement: 'bottomRight',
      });
      history.push('/auth');
    }

    return (
      <div>
        <Card title="User profile">
          <div className="site-card-border-less-wrapper">
            <div className="user-img">
              <Card bordered={false} className="avatar-card">
                <Avatar shape="square" size={64} icon={<UserOutlined />} />
                <Divider orientation="left">Username</Divider>
                <Tag color="red">
                  {user.currentUser.username || profile.user.username}
                  {' '}
                </Tag>
              </Card>
            </div>
            <div>
              <Card type="inner" title="User profile">
                <Descriptions layout="vertical">
                  <Descriptions.Item label="First name">
                    <p>{profile.profile.first_name || isEmpty}</p>
                  </Descriptions.Item>
                  <Descriptions.Item label="Second name">
                    {profile.profile.second_name || isEmpty }
                  </Descriptions.Item>
                  <Descriptions.Item label="Telephone">
                    {profile.profile.tel_number || isEmpty}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {profile.profile.location || isEmpty}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card type="inner" title="Acount type">
                {user.currentUser.user_type}
              </Card>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => {
    dispatch(getUserProfile());
  },
});
UserProfile.propTypes = {
  profile: PropTypes.shape({
    setProfile: PropTypes.bool,
    response: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    profile: PropTypes.shape({
      first_name: PropTypes.string,
      second_name: PropTypes.string,
      tel_number: PropTypes.string,
      location: PropTypes.string,

    }),
  }),
  onPageLoad: PropTypes.func,
  history: PropTypes.string,
  user: PropTypes.shape({
    currentUser: PropTypes.shape({
      username: PropTypes.string,
      user_type: PropTypes.string,
    }),
    isLogged: PropTypes.bool,
    response: PropTypes.string,

  }),
};
UserProfile.defaultProps = {
  profile: PropTypes.shape({
    saveProfile: false,
    response: '',
  }),
  onPageLoad: () => {},
  history: '/auth',
  user: PropTypes.shape({
    currentUser: PropTypes.shape({
      username: '',
      user_type: '',
    }),
    isLogged: false,
    response: '',

  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
