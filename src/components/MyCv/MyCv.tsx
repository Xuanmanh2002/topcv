import React from 'react';
import { Table, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface CvData {
  key: string;
  companyName: string;
  position: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  dateSent: string;
}

const MyCv: React.FC = () => {
  const dataSource: CvData[] = [
    {
      key: '1',
      companyName: 'Tech Company A',
      position: 'Frontend Developer',
      status: 'Pending',
      dateSent: '2024-11-01',
    },
    {
      key: '2',
      companyName: 'Tech Company B',
      position: 'Backend Developer',
      status: 'Accepted',
      dateSent: '2024-10-25',
    },
    {
      key: '3',
      companyName: 'Tech Company C',
      position: 'Fullstack Developer',
      status: 'Rejected',
      dateSent: '2024-10-20',
    },
  ];

  const columns: ColumnsType<CvData> = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: CvData['status']) => {
        let color = '';
        switch (status) {
          case 'Accepted':
            color = 'green';
            break;
          case 'Rejected':
            color = 'red';
            break;
          case 'Pending':
          default:
            color = 'gold';
            break;
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Date Sent',
      dataIndex: 'dateSent',
      key: 'dateSent',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: CvData) => (
        <Space size="middle">
          <a href="#edit">Edit</a>
          <a href="#delete">Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="my-cv-container">
      <h2 className="my-cv-title">CV của tôi</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default MyCv;
