import React, { useState } from 'react';
import JobItem from './JobItem';
import { LeftOutlined, RightOutlined, FilterOutlined, HeartOutlined } from '@ant-design/icons';

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
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
  { title: 'Nhân Viên Kế Toán', location: 'Hà Nội', salary: 'Trên 10 triệu', company: 'Công ty XYZ', logots: 'https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/ngan-hang-tmcp-viet-nam-thinh-vuong-vpbank-63e1cb5539e62.jpg' },
];
const locations = ['Ngẫu nhiên', 'Hà Nội', 'Thành phố Hồ Chí Minh', 'Miền Bắc', 'Miền Nam'];
const JobList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className='container'>
      <div className='main-form-job'>
        <section className="main-form-job-header">
          <div className="main-form-job-header-item">
            <div className="main-form-job-header-item-title">
              <h1>Việc làm tốt nhất</h1>
            </div>
            <div className="vertical-line" />
            <div className="main-form-job-header-item-img">
              <img src='https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/feature-job/label-toppy-ai.png'></img>
            </div>
            <div className='main-form-job-header-item-page-size'>
              <a className="main-form-job-header-item-page-size-see-more">Xem tất cả</a>
              <LeftOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" />
              <RightOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" />
            </div>
          </div>
        </section>
        <div className="main-form-job-filter">
          <div className="main-form-job-filter-item">
            <div className='main-form-job-filter-item-input'>
              <div className="main-form-job-filter-item-input-prepend">
                <span className='main-form-job-filter-item-input-prepend-bar'>
                  <FilterOutlined />
                  Lọc theo:
                </span>
              </div>
              <select className='main-form-job-filter-item-input-selected' tabIndex={-1} aria-hidden="true">
                <option value="cities">Địa điểm</option>
                <option value="salary">Mức lương</option>
                <option value="experience">Kinh nghiệm</option>
                <option value="categoriesJob">Ngành nghề</option>
              </select>
            </div>
          </div>
          <div className='main-form-job-filter-box-map'>
            <div className='main-form-job-filter-box-map-localtion'>

              <div className='main-form-job-filter-box-map-list-location'>
                <LeftOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" />
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className={`main-form-job-filter-box-map-list-location-item ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleClick(index)}
                  >
                    {location}
                  </div>
                ))}
                <RightOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" />
              </div>
            </div>
          </div>
        </div>
        <div className="main-form-job-list">
          <div className="main-form-job-list-grid">
            {jobs.slice(0, 12).map((job, index) => (
              <JobItem key={index} job={job} />
            ))}
          </div>
        </div>
        <div className="main-pagination-container">
          <div className="main-page-size">
            <LeftOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" />
            <span className="main-page-infor"><span className="main-page-number">32</span> / 47 trang</span>
            <RightOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" />
          </div>
        </div>
      </div>
    </div >
  );
};

export default JobList;
