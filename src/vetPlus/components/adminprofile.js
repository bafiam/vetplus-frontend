import React, { Component } from "react";
import {
  Card,
  notification,
  Button,
  Descriptions,
  List,
  Skeleton,
  Avatar,
} from "antd";
import "../css/profile.css";
import { connect } from "react-redux";
import {
  getUnapprovedVet,
  adminUpdateProfile,
} from "../modules/reducers/profileEffects";

class AdminProfile extends Component {
  

  componentDidMount() {
    this.props.onPageLoad();
    if (this.props.profile.setProfile === false) {
      notification["info"]({
        message: `Vet profiles are loading......`,
        description: this.props.profile.response,
        duration: 6,
        placement: "topLeft",
      });
    }
  }
  onApprov = (e, data) => {
    if (data !== undefined) {
      this.props.updateApprov(data);
      notification["success"]({
        message: `Vet approved`,
        description: this.props.profile.response,
        duration: 6,
        placement: "topLeft",
      });
      this.props.onPageLoad();
    }
  };


  render() {
    if (this.props.profile.setProfile === true) {
           
    
      notification["success"]({
        message: `Vet profiles loaded.`,
        description: this.props.profile.response,
        duration: 6,
        placement: "topLeft",
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
        <Card title="Admin">
          <div className="site-card-border-less-wrapper">
            <div>
              <Card type="inner" title="Vets profile waiting approval">
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={this.props.profile.profile}
                  renderItem={(item) => (
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
                        onClick={(e) => this.onApprov(e, item.id)}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => {
      dispatch(getUnapprovedVet());
    },
    updateApprov: (value) => {
      dispatch(adminUpdateProfile(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
