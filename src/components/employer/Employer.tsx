import React, { useEffect, useState } from 'react';
import { Input, Button, Space, Typography, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getEmployerByRank } from '../utils/ApiFunctions';
import company from '../../assets/img/company-billBoard.webp';

const { Search } = Input;
const { Title, Paragraph } = Typography;

interface EmployerResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  telephone: string;
  addressId: string;
  companyName: string;
  avatar: string;
  rank: string;
  scale: string;
  fieldActivity: String;
}

const Employer = () => {
  const [employers, setEmployers] = useState<EmployerResponse[]>([]);
  const [filteredEmployers, setFilteredEmployers] = useState<EmployerResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const data = await getEmployerByRank();
        setEmployers(data);
        setFilteredEmployers(data);
      } catch (error: any) {
        setError('Error fetching employers by rank.');
        message.error('Failed to fetch employers.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const handleSearch = (value: string) => {
    const filtered = employers.filter((employer) =>
      employer.companyName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployers(filtered);
  };

  const handleCompanyClick = (companyName: string, email: string) => {
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('email', email);
    console.log(companyName, email);
    navigate(`/cong-ty/${companyName}`);
  };

  return (
    <div className="employer-container">
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
                onSearch={handleSearch}
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
      <div className="featured-companies">
        <h4 className="featured-companies-title">
          DANH SÁCH CÁC CÔNG TY NỔI BẬT
        </h4>
        <div className="featured-companies-content">
          {loading ? (
            <Spin size="large" />
          ) : error ? (
            <p>{error}</p>
          ) : (
            filteredEmployers.map((employer) => (
              <div
                key={employer.id}
                className="company-card"
                onClick={() => handleCompanyClick(employer.companyName, employer.email)}
              >
                <img
                  alt={employer.companyName}
                  src={employer.avatar ? `data:image/png;base64,${employer.avatar}` : '/default-avatar.png'}
                  className="company-card-img"
                />
                <div className="company-card-meta">
                  <h5 className="company-name">{employer.companyName}</h5>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Employer;
