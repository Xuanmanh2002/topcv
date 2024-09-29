import React from 'react';
import { HeartOutlined } from '@ant-design/icons';

interface JobItemProps {
  job: {
    title: string;
    location: string;
    salary: string;
    company: string;
    logots: string;
  };
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  return (
    <div className="main-form-job-list-grid-item">
      <img className="main-form-job-list-grid-item-img" src={job.logots} alt={`${job.company} logo`} />
      <div className="main-form-job-list-grid-item-details">
        <h3 className="main-form-job-list-grid-item-title">{job.title}</h3>
        <p className="main-form-job-list-grid-item-company">{job.company}</p>
        <div className="main-form-job-list-grid-item-info">
          <p className="main-form-job-list-grid-item-info-location">{job.location}</p>
          <p className="main-form-job-list-grid-item-info-salary">{job.salary}</p>
          <HeartOutlined className="main-form-job-list-grid-item-info-icon"/>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
