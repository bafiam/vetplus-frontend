import React, { Component } from 'react';
import {
  Card,
  notification,
  Button,
  Descriptions,
  List,
  Skeleton,

} from 'antd';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getUnapprovedVet,
  adminUpdateProfile,
} from '../modules/reducers/profileEffects';

class AdminProfile extends Component {
  constructor(props) {
    super(props);

    this.onApprov = this.onApprov.bind(this);
  }

  componentDidMount() {
    const {
      onPageLoad, profile,
    } = this.props;
    onPageLoad();
    if (profile.setProfile === false) {
      notification.info({
        message: 'Vet profiles are loading......',
        description: profile.response,
        duration: 6,
        placement: 'topLeft',
      });
    }
  }

  onApprov(e, data) {
    const {
      onPageLoad, profile, updateApprov,
    } = this.props;
    if (data !== undefined) {
      updateApprov(data);
      notification.success({
        message: 'Vet approved',
        description: profile.response,
        duration: 6,
        placement: 'topLeft',
      });
      onPageLoad();
    }
  }

  render() {
    const {
      profile, user, history,
    } = this.props;
    if (profile.setProfile === true) {
      notification.success({
        message: 'Vet profiles loaded.',
        description: profile.response,
        duration: 6,
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
        <Card title="Admin">
          <div className="site-card-border-less-wrapper">
            <div>
              <Card type="inner" title="Vets profile waiting approval">
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={profile.profile}
                  renderItem={item => (
                    <List.Item>
                      <Skeleton
                        avatar
                        title={false}
                        loading={item.loading}
                        active
                      >
                        <Descriptions layout="vertical">
                          <Descriptions.Item label="First name">
                            {item.first_name}
                          </Descriptions.Item>
                          <Descriptions.Item label="Second name">
                            {item.second_name}
                          </Descriptions.Item>
                          <Descriptions.Item label="Location">
                            {item.location}
                          </Descriptions.Item>
                          <Descriptions.Item label="Phone number">
                            {item.tel_number}
                          </Descriptions.Item>
                          <Descriptions.Item label="Licence number">
                            {item.vet_number}
                          </Descriptions.Item>
                          <Descriptions.Item label="Account status">
                            {item.approved_status}
                          </Descriptions.Item>
                        </Descriptions>
                      </Skeleton>
                      <Button
                        type="dashed"
                        danger
                        onClick={e => this.onApprov(e, item.id)}
                      >
                        Approve
                      </Button>
                    </List.Item>
                  )}
                />
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
    dispatch(getUnapprovedVet());
  },
  updateApprov: value => {
    dispatch(adminUpdateProfile(value));
  },
});
AdminProfile.propTypes = {
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
      approved_status: PropTypes.string,
      vet_number: PropTypes.string,

    }),
  }),
  onPageLoad: PropTypes.func,
  updateApprov: PropTypes.func,
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
AdminProfile.defaultProps = {
  profile: PropTypes.shape({
    saveProfile: false,
    response: '',
  }),
  onPageLoad: () => {},
  updateApprov: () => {},
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);