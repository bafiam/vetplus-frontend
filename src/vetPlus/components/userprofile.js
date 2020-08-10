import React, { Component } from "react";
import { Card, Avatar, Descriptions, notification, Divider, Tag} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../css/profile.css";
import { connect } from "react-redux";
import {getUserProfile} from '../modules/reducers/profileEffects'

class UserProfile extends Component {
  componentDidMount(){
    this.props.onPageLoad()
    if (this.props.profile.setProfile === false) {
      notification['info']({
        message: `Your profile is loading......`,
        description:this.props.profile.response,
        duration: 6,
        placement:"topLeft"
      });
      }
  }
  
  render() {
    let isEmpty = "N/A"
    if (this.props.profile.setProfile === true) {
      notification['success']({
        message: `Your profile is ready ${this.props.user.currentUser.username}`,
        description:this.props.profile.response,
        duration: 2,
        placement:"topLeft"
      });
    }
    if (
      this.props.user.isLogged === undefined ||
      this.props.user.isLogged === false
    ) {
      notification["warning"]({
        message:
          "System resume failed, if it doesnt resume in a few, try to login again",
        description: this.props.user.response,
        duration: 10,
        placement: "bottomRight",
      });
      this.props.history.push("/auth");
    }
    
    return (
      <div>
        <Card title="User profile">
          <div className="site-card-border-less-wrapper">
            <div className="user-img">
              <Card bordered={false} className="avatar-card">
                <Avatar shape="square" size={64} icon={<UserOutlined />} />
                <Divider orientation="left">Username</Divider>
                <Tag color="red">{this.props.user.currentUser.username || this.props.profile.user.username} </Tag>
              </Card>
            </div>
            <div>
              <Card type="inner" title="User profile">
                <Descriptions layout="vertical">
                  <Descriptions.Item label="First name">
                   <p>{this.props.profile.profile.first_name || isEmpty}</p> 
                  </Descriptions.Item>
                  <Descriptions.Item label="Second name">
                  {this.props.profile.profile.second_name || isEmpty }
                  </Descriptions.Item>
                  <Descriptions.Item label="Telephone">
                  {this.props.profile.profile.tel_number || isEmpty}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                  {this.props.profile.profile.location || isEmpty}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card type="inner" title="Acount type">
    {this.props.user.currentUser.user_type}
              </Card>
            </div>
          </div>
        </Card>
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


const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => {
      dispatch(getUserProfile());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);