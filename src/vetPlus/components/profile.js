import React, { Component } from "react";
import "../css/profile.css";
import Editprofile from './editprofile'
import { connect } from "react-redux";
import UserProfile from './userprofile'
import EditVetprofile from './editvetprofile'
import VetProfile from './vetprofile'
import AdminProfile from '../components/adminprofile'
class Profile extends Component {
  render() {
    let editprofile
    let userprofile
    if (this.props.user.isUser === true && this.props.user.isAdmin === false && this.props.user.isVet === false) {
      if (this.props.profile.setProfile === false) {
        editprofile = <Editprofile></Editprofile>
      }
      userprofile = <UserProfile></UserProfile>
    }
    if (this.props.user.isUser === false && this.props.user.isAdmin === false && this.props.user.isVet === true) {
      if (this.props.profile.setProfile === false) {
        editprofile = <EditVetprofile></EditVetprofile>
      }
      
      userprofile = <VetProfile></VetProfile>
    }
    if (this.props.user.isUser === false && this.props.user.isAdmin === true && this.props.user.isVet === false) {
     
      userprofile = <AdminProfile></AdminProfile>
    }

    return (
      <div>
        {editprofile}
        {userprofile}
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile:state.profile
  };
};


export default connect(mapStateToProps, null)(Profile);