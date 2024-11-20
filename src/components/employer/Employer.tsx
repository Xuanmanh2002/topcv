import React from 'react';
import { Input, Button, Card, Row, Col, Typography, Space } from 'antd';
import Header from './Header';


const { Title, Paragraph } = Typography;

const Employer = () => {
  return (
    <div className="employer-container">
      <Header />
      <div className="featured-companies">
        <Title level={4} className="featured-companies-title">
          DANH SÁCH CÁC CÔNG TY NỔI BẬT
        </Title>
        <Row className='featured-companies-content'>
          <Col>
            <Card
              hoverable
              className="company-card"
              cover={
                <img
                  alt="Vuihoc"
                  src="vuihoc.png"
                  className="company-card-img"
                />
              }
            >
              <Card.Meta
                title="VUIHOC.VN"
                description="VUIHOC là trường học trực tuyến cho học sinh từ lớp 1 đến lớp 12 với sứ mệnh 'đem cơ hội tiếp cận bình đẳng các chương trình giáo dục chất lượng cao...'"
              />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              className="company-card"
              cover={
                <img
                  alt="Vuihoc"
                  src="vuihoc.png"
                  className="company-card-img"
                />
              }
            >
              <Card.Meta
                title="VUIHOC.VN"
                description="VUIHOC là trường học trực tuyến cho học sinh từ lớp 1 đến lớp 12 với sứ mệnh 'đem cơ hội tiếp cận bình đẳng các chương trình giáo dục chất lượng cao...'"
              />
            </Card>
          </Col>
          <Col>
            <Card
              hoverable
              className="company-card"
              cover={
                <img
                  alt="Vuihoc"
                  src="vuihoc.png"
                  className="company-card-img"
                />
              }
            >
              <Card.Meta
                title="VUIHOC.VN"
                description="VUIHOC là trường học trực tuyến cho học sinh từ lớp 1 đến lớp 12 với sứ mệnh 'đem cơ hội tiếp cận bình đẳng các chương trình giáo dục chất lượng cao...'"
              />
            </Card>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default Employer;
