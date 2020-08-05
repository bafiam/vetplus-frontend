import React, { Component } from "react";
import { Card, Col, Row } from "antd";
class Dashbaord extends Component {
  render() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Pending Appointments" bordered={false}>
              6
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Confirmed Appointments" bordered={false}>
              3
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Service Delivered" bordered={false}>
              2
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashbaord;
