import React from 'react';
import { Card, Col, Row } from 'antd';

const Dashbaord = () => (
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

export default Dashbaord;
