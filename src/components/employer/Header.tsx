import React from 'react'
import { Input, Button, Card, Row, Col, Typography, Space } from 'antd';
import company from '../../assets/img/company-billBoard.webp';

const { Search } = Input;
const { Title, Paragraph } = Typography;

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <div className="header-tabs">
              <Space size="large">
                <Button type="link" className="tab-button active">
                  Danh sách công ty
                </Button>
                <Button type="link" className="tab-button">
                  Top công ty
                </Button>
              </Space>
            </div>
            <Title level={2} className="header-title">
              Khám phá 100.000+ công ty nổi bật
            </Title>
            <Paragraph className="header-description">
              Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn
            </Paragraph>
            <div className="search-bar">
              <Search
                placeholder="Nhập tên công ty"
                enterButton={<Button type="primary">Tìm kiếm</Button>}
                size="large"
                className="search-input-company"
              />
            </div>
          </div>
          <div className="header-img">
            <img
              src={company}
              alt="Company Billboard"
              className="company-img"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
