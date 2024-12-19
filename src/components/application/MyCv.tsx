import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Spin, Alert } from 'antd';
import { getAllApplicationsByCustomer, checkRoleCustomer } from '../utils/ApiFunctions';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export interface CustomerResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

interface ApplicationDocumentsResponse {
  id: number;
  fullName: string;
  email: string;
  telephone: string;
  cv: string | null;
  letter: string;
  status: string;
  createAt: string;
  jobId: number | null;
  jobName: String | null;
  employerId: string | null;
  companyName: string | null;
}

interface ApplicationDocuments {
  id: number;
  fullName: string;
  email: string;
  telephone: string;
  photoBytes: Uint8Array | null;
  letter: string;
  status: string;
  createdAt: string;
  customerResponse: CustomerResponse;
  jobId: string;
}

const MyCv: React.FC = () => {
  const [dataSource, setDataSource] = useState<ApplicationDocuments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasRoleCustomer, setHasRoleCustomer] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRole = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const roleIsCustomer = await checkRoleCustomer(token);
        if (!roleIsCustomer) {
          navigate('/dang-nhap');
        }
        setHasRoleCustomer(roleIsCustomer);
      } else {
        navigate('/dang-nhap');
      }
    };

    verifyRole();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token && hasRoleCustomer) {
          const applicationDocumentsResponse = await getAllApplicationsByCustomer(token);
          const applicationDocuments: ApplicationDocuments[] = applicationDocumentsResponse.map((doc) => ({
            ...doc,
            photoBytes: null,
            createdAt: doc.createAt,
            customerResponse: {
              id: '',
              email: doc.email,
              firstName: '',
              lastName: '',
              avatar: null,
            },
            jobId: doc.jobId !== null ? String(doc.jobId) : '',
          }));

          setDataSource(applicationDocuments);
        } else {
          setError('No token found or role not customer');
          navigate('/dang-nhap');
        }
      } catch (error: any) {
        setError(error.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (hasRoleCustomer) {
      fetchData();
    }
  }, [hasRoleCustomer]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className="my-cv-container">
      <h2 className="my-cv-title">CV của tôi</h2>
      <Table
        dataSource={dataSource}
        rowKey="id"
        columns={[
          {
            title: 'Stt',
            key: 'index',
            render: (_, __, index) => index + 1, // Hiển thị số thứ tự từ 1
          },
          {
            title: 'Tên công việc',
            dataIndex: 'jobName',
            key: 'jobName',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Tên công ty',
            dataIndex: 'companyName',
            key: 'companyName',
          },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
              let color = '';
              switch (status) {
                case 'Accepted':
                  color = 'green';
                  break;
                case 'Reject':
                  color = 'red';
                  break;
                case 'RECEIVED':
                default:
                  color = 'green';
                  break;
              }
              return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
          },
          {
            title: 'Ngày khởi tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => format(new Date(createdAt), 'dd/MM/yyyy'),
          },
          {
            title: 'Chức năng',
            key: 'actions',
            render: (_, record) => (
              <Space size="middle">
                <a href="#delete" className="anticon-delete"><DeleteOutlined /></a>
              </Space>
            ),
          },
        ]}
      />

    </div>
  );
};

export default MyCv;
