import React, { Component } from "react";
import {  Modal, Button} from "antd";
import "../css/profile.css";
class Editprofile extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading} = this.state;
    return (
        <div className="edit-div">
          <Button type="primary" onClick={this.showModal}>
            Edit profile
          </Button>
          <Modal
            title="Profile form"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <div>form</div>
          </Modal>
        </div>
     
    );
  }
}

export default Editprofile;
