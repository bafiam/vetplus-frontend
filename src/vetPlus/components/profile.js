import React, { Component } from "react";
import { Card, Avatar, Descriptions} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../css/profile.css";
import Editprofile from './editprofile'
class Profile extends Component {
  render() {

    return (
      <div>
        <Editprofile></Editprofile>
        <Card title="User profile">
          <div className="site-card-border-less-wrapper">
            <div className="user-img">
              <Card bordered={false} className="avatar-card">
                <Avatar shape="square" size={64} icon={<UserOutlined />} />
                <p>Stephen Gumba</p>
              </Card>
            </div>
            <div>
              <Card type="inner" title="User profile">
                <Descriptions layout="vertical">
                  <Descriptions.Item label="UserName">
                    Zhou Maomao
                  </Descriptions.Item>
                  <Descriptions.Item label="Telephone">
                    1810000000
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Remark">empty</Descriptions.Item>
                  <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang,
                    China
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card type="inner" title="Acount data">
                Inner Card content
              </Card>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Profile;
