import React, { Component } from "react";
import { Card, Avatar, Descriptions} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../css/profile.css";
import Editprofile from './editprofile'
import { connect } from "react-redux";
import UserProfile from './userprofile'
import EditVetprofile from './editvetprofile'
import VetProfile from './vetprofile'
class Profile extends Component {
  render() {
    let editprofile
    let userprofile
    if (this.props.user.isUser === true && this.props.user.isAdmin === false && this.props.user.isVet === false) {
      editprofile = <Editprofile></Editprofile>
      userprofile = <UserProfile></UserProfile>
    }
    if (this.props.user.isUser === false && this.props.user.isAdmin === false && this.props.user.isVet === true) {
      editprofile = <EditVetprofile></EditVetprofile>
      userprofile = <VetProfile></VetProfile>
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
  };
};


export default connect(mapStateToProps, null)(Profile);