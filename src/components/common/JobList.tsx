import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined, FilterOutlined, HeartOutlined } from '@ant-design/icons';
import { getAllJob, getAllAddress } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";

interface Address {
  id: string;
  name: string;
}

interface EmployerResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  telephone: string;
  addressId: string;
  companyName: string;
  avatar: string | null;
  rank: string;
}

interface Job {
  id: number;
  jobName: string;
  experience: string;
  applicationDeadline: Date;
  recruitmentDetails: string;
  price: string;
  employerId: string;
  categoryId: string;
  createAt: Date;
  employerEmail?: string;
  employerResponse: EmployerResponse;
  ranker: string;
  quantity: number;
  workingForm: string;
  gender: string;
}

const JobList: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [currentAddressPage, setCurrentAddressPage] = useState(1);
  const jobsPerPage = 12;
  const addressesPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getAllJob();
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const addressData = await getAllAddress();
        setAddresses(addressData);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchJobs();
    fetchAddresses();
  }, []);

  const handleNextJobPage = () => {
    if (currentJobPage < Math.ceil(jobs.length / jobsPerPage)) {
      setCurrentJobPage(currentJobPage + 1);
    }
  };

  const handlePrevJobPage = () => {
    if (currentJobPage > 1) {
      setCurrentJobPage(currentJobPage - 1);
    }
  };

  const handleNextAddressPage = () => {
    if (currentAddressPage < Math.ceil(addresses.length / addressesPerPage)) {
      setCurrentAddressPage(currentAddressPage + 1);
    }
  };

  const handlePrevAddressPage = () => {
    if (currentAddressPage > 1) {
      setCurrentAddressPage(currentAddressPage - 1);
    }
  };

  const indexOfLastJob = currentJobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const indexOfLastAddress = currentAddressPage * addressesPerPage;
  const indexOfFirstAddress = indexOfLastAddress - addressesPerPage;
  const currentAddresses = addresses.slice(indexOfFirstAddress, indexOfLastAddress);

  const handleJobClick = (jobName: string, id: number) => {
    localStorage.setItem('jobName', jobName);
    localStorage.setItem('id', id.toString());  
    console.log(jobName, id);
    navigate(`/viec-lam/${jobName}`);
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
              <img src='https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/feature-job/label-toppy-ai.png' alt="Header" />
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
              <div className="main-form-job-filter-item-select-wrapper">
                <select className='main-form-job-filter-item-input-selected' tabIndex={-1} aria-hidden="true">
                  <option value="cities">Địa điểm</option>
                  <option value="salary">Mức lương</option>
                  <option value="experience">Kinh nghiệm</option>
                  <option value="categoriesJob">Ngành nghề</option>
                </select>
                <FaChevronDown className="dropdown-icon" />
              </div>
            </div>
          </div>
          <div className='main-form-job-filter-box-map'>
            <div className='main-form-job-filter-box-map-localtion'>
              <div className='main-form-job-filter-box-map-list-location'>
                <LeftOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" onClick={handlePrevAddressPage} />
                <div className={`main-form-job-filter-box-map-list-location-item`}>Hà Nội</div>
                <div className={`main-form-job-filter-box-map-list-location-item`}>Thành phố Hồ Chí Minh</div>
                <div className={`main-form-job-filter-box-map-list-location-item`}>Miền Bắc</div>
                <div className={`main-form-job-filter-box-map-list-location-item`}>Miền Nam</div>
                <RightOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" onClick={handleNextAddressPage} />
              </div>
            </div>
          </div>
        </div>
        <div className="main-form-job-list">
          <div className="main-form-job-list-grid">
            {currentJobs.map(job => (
              <div key={job.id} className="main-form-job-list-grid-item">
                <img
                  className="main-form-job-list-grid-item-img"
                  src={job.employerResponse.avatar ? `data:image/jpeg;base64,${job.employerResponse.avatar}` : "default-avatar-url.jpg"}
                  alt={job.jobName}
                />
                <div className="main-form-job-list-grid-item-details">
                  <h3 className="main-form-job-list-grid-item-title"
                    onClick={() => handleJobClick(job.jobName, job.id)}
                    style={{ cursor: 'pointer' }}>
                    {job.jobName.length > 23 ? job.jobName.slice(0, 23) + '...' : job.jobName}
                  </h3>
                  <p className="main-form-job-list-grid-item-company">{job.employerResponse.companyName}</p>
                  <div className="main-form-job-list-grid-item-info">
                    <p className="main-form-job-list-grid-item-info-location">
                      {
                        addresses.find(address => address.id === job.employerResponse.addressId)?.name || "Địa chỉ không xác định"
                      }
                    </p>
                    <p className="main-form-job-list-grid-item-info-salary">{job.price} VNĐ</p>
                    <HeartOutlined className="main-form-job-list-grid-item-info-icon" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="main-pagination-container">
          <div className="main-page-size">
            <LeftOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" onClick={handlePrevJobPage} />
            <span className="main-page-infor">
              <span className="main-page-number">{currentJobPage}</span> / {Math.ceil(jobs.length / jobsPerPage)} trang
            </span>
            <RightOutlined className="main-form-job-header-item-page-size-see-more-icon-wrapper" onClick={handleNextJobPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
