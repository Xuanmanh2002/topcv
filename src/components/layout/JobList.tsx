import React, { useState } from 'react';
import JobItem from './JobItem';
import { LeftOutlined, RightOutlined, FilterOutlined } from '@ant-design/icons';

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
  const [activeIndex, setActiveIndex] = useState(0); // Index cho vị trí được chọn

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className='container'>
      <div className='job'>
        <section className="title-job">
          <div className="title-main">
            <div className="title1">
              <h1>Việc làm tốt nhất</h1>
            </div>
            <div className="vertical-line" />
            <div className="img-title">
              <img src='https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/feature-job/label-toppy-ai.png'></img>
            </div>
            <div className='page-list-job'>
              <a className="see-more">Xem tất cả</a>
              <LeftOutlined className="icon-wrapper" />
              <RightOutlined className="icon-wrapper" />
            </div>
          </div>
        </section>
        <div className="box-filter">
          <div className="filter">
            <div className='input-group'>
              <div className="input-group-prepend">
                <span className='filter-bars'>
                  <FilterOutlined />
                  Lọc theo:
                </span>
              </div>
              <select className='form-control' tabIndex={-1} aria-hidden="true">
                <option value="cities">Địa điểm</option>
                <option value="salary">Mức lương</option>
                <option value="experience">Kinh nghiệm</option>
                <option value="categoriesJob">Ngành nghề</option>
              </select>
            </div>
          </div>
          <div className='box-map'>
            <div className='map-localtion'>

              <div className='list-location'>
                <LeftOutlined className="icon-wrapper" />
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className={`location-item ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleClick(index)}
                  >
                    {location}
                  </div>
                ))}
                <RightOutlined className="icon-wrapper" />
              </div>

            </div>
          </div>
        </div>
        <div className="job-list">
          <div className="job-list-grid">
            {jobs.slice(0, 12).map((job, index) => (
              <JobItem key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default JobList;
