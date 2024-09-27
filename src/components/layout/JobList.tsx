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
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Tư Vấn', location: 'Hồ Chí Minh', salary: '15 - 30 triệu', company: 'Công ty ABC', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  // Add more jobs here
];

const JobList: React.FC = () => {
  return (
    <div className='container'>
      <div className='job'>
        <div className="title-job">
          <div className="title-main">
            <div className="title1">
              <h1>Việc làm tốt nhất</h1>
            </div>
            <div className="img-title">
              <img src='https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/feature-job/label-toppy-ai.png'></img>
            </div>
          </div>
          <div>
            <a>Xem tất cả</a>
          </div>
        </div>
        <div className="job-list">
          {jobs.map((job, index) => (
            <JobItem key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
