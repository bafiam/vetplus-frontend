import React, { Component } from 'react';
import {
  Card, Avatar, Descriptions, notification, Tag, Divider,
} from 'antd';
import { UserOutlined, SyncOutlined } from '@ant-design/icons';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getVetProfile } from '../modules/reducers/profileEffects';

class VetProfile extends Component {
  componentDidMount() {
    const { onPageLoad, profile } = this.props;
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
    const isEmpty = 'N/A';
    let accStatus;
    const { profile, user, history } = this.props;
    if (profile.profile.approved_status !== undefined) {
      if (profile.profile.approved_status === 'Yes') {
        accStatus = <Tag color="success">Approved</Tag>;
      }
      if (profile.profile.approved_status === 'No') {
        accStatus = (
          <Tag icon={<SyncOutlined spin />} color="processing">
            processing
          </Tag>
        );
      }
    }

    if (profile.setProfile === true) {
      notification.success({
        message: `Your profile is ready ${user.currentUser.username}`,
        description: profile.response,
        duration: 2,
        placement: 'bottomLeft',
      });
    }

    if (user.isLogged === undefined || user.isLogged === false) {
      history.push('/auth');
    }

    return (
      <div>
        <Card title="Vet profile">
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
                    {profile.profile.second_name || isEmpty}
                  </Descriptions.Item>
                  <Descriptions.Item label="Telephone">
                    {profile.profile.tel_number || isEmpty}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {profile.profile.location || isEmpty}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vet number">
                    {profile.profile.vet_number || isEmpty}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card type="inner" title="Acount Type">
                <Tag color="geekblue">
                  {' '}
                  {user.currentUser.user_type}
                </Tag>
                <Divider orientation="left">Approval status</Divider>
                {accStatus || isEmpty}
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
    dispatch(getVetProfile());
  },
});
VetProfile.propTypes = {
  profile: PropTypes.shape({
    setProfile: PropTypes.bool,
    response: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
    profile: PropTypes.shape(
      PropTypes.objectOf({
        first_name: PropTypes.string,
        second_name: PropTypes.string,
        tel_number: PropTypes.string,
        location: PropTypes.string,
        approved_status: PropTypes.string,
        vet_number: PropTypes.string,
      }),
    ),
  }),
  onPageLoad: PropTypes.func,
  history: PropTypes.func,
  user: PropTypes.shape({
    currentUser: PropTypes.shape({
      username: PropTypes.string,
      user_type: PropTypes.string,
    }),
    isLogged: PropTypes.bool,
    response: PropTypes.string,
  }),
};
VetProfile.defaultProps = {
  profile: PropTypes.shape({
    saveProfile: false,
    response: '',
  }),
  onPageLoad: () => {},
  history: PropTypes.func,
  user: PropTypes.shape({
    currentUser: PropTypes.shape({
      username: '',
      user_type: '',
    }),
    isLogged: false,
    response: '',
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(VetProfile);
