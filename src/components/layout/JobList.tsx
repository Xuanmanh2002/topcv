import React from 'react';
import JobItem from './JobItem';

interface Job {
  title: string;
  location: string;
  salary: string;
  company: string;
  logots: string; 
}

const jobs: Job[] = [
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://example.com/logo1.png' },
  { title: 'Nhân Viên Tư Vấn', location: 'Hồ Chí Minh', salary: '15 - 30 triệu', company: 'Công ty ABC', logots: 'https://example.com/logo2.png' },
  // Add more jobs here
];

const JobList: React.FC = () => {
  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <JobItem key={index} job={job} />
      ))}
    </div>
  );
};

export default JobList;
