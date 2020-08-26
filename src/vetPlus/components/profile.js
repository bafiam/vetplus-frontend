import React from 'react';
import '../css/profile.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Editprofile from './editprofile';
import UserProfile from './userprofile';
import EditVetprofile from './editvetprofile';
import VetProfile from './vetprofile';
import AdminProfile from './adminprofile';

const Profile = props => {
  let editprofile;
  let userprofile;
  const { user, profile } = props;
  if (
    user.isUser === true
      && user.isAdmin === false
      && user.isVet === false
  ) {
    if (profile.setProfile === false) {
      editprofile = <Editprofile />;
    }
    userprofile = <UserProfile />;
  }
  if (
    user.isUser === false
      && user.isAdmin === false
      && user.isVet === true
  ) {
    if (profile.setProfile === false) {
      editprofile = <EditVetprofile />;
    }

    userprofile = <VetProfile />;
  }
  if (
    user.isUser === false
      && user.isAdmin === true
      && user.isVet === false
  ) {
    userprofile = <AdminProfile />;
  }
  return (
    <div>
      {editprofile}
      {userprofile}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
});

Profile.propTypes = {
  user: PropTypes.shape({
    isUser: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isVet: PropTypes.bool.isRequired,
  }),
  profile: PropTypes.shape({
    setProfile: PropTypes.bool.isRequired,
  }),
};
Profile.defaultProps = {
  user: PropTypes.shape({
    isUser: false,
    isAdmin: false,
    isVet: false,
  }),
  profile: PropTypes.shape({
    setProfile: false,
  }),
};

export default connect(mapStateToProps, null)(Profile);
