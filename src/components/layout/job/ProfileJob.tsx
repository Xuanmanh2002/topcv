import React, { useState, useEffect } from 'react';
import { getAllJob, getAllCategory, getAllAddress } from '../../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { HourglassOutlined } from '@ant-design/icons';
import SearchForm from './SearchForm';

const ProfileJob = () => {
  interface Category {
    id: number;
    categoryName: string;
  }

  interface Address {
    id: number;
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
  }

  interface Job {
    id: string;
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
  }

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSearch = () => {
    console.log(searchTerm);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getAllJob();
        setJobs(jobData);
        if (jobData.length > 0) {
          setSelectedJob(jobData[0]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const fetchedAddresses = await getAllAddress();
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategory();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchJobs();
    fetchAddresses();
    fetchCategories();
  }, []);

  return (
    <div className='container'>
      <div className="job-detail-layout">
        <SearchForm />
        <div className='job-detail-main'>
          <div className="job-detail-content">
            <div className="job-navbar">
              <Link className="job-link" to="/">
                Trang chủ
              </Link>
              <FaChevronRight className="icon-divider" />
              <Link className="job-link" to="/jobs">
                Tìm việc làm
              </Link>
              <FaChevronRight className="icon-divider" />
              <Link className="job-link-namejob" to={`/jobs/${selectedJob?.id}`} style={{ color: "black", fontWeight: "bold" }}>
                {selectedJob?.jobName || "Job Name"}
              </Link>
            </div>
            <div className='job-company-profile'>
              <div className="job-card">
                <h3>{selectedJob?.jobName || "Job Title Placeholder"}</h3>
                <div className="job-info">
                  <p>
                    <FaDollarSign />
                    <a className='job-price'>
                      Mức lương
                      <span>{selectedJob?.price || "Not specified"}</span>
                    </a>
                  </p>
                  <p>
                    <FaMapMarkerAlt />
                    <a className='job-location'>
                      Địa điểm
                      <span>{
                        addresses.find((addr) => addr.id === Number(selectedJob?.employerResponse?.addressId))?.name || "Unknown"
                      }</span>
                    </a>
                  </p>
                  <p>
                    <HourglassOutlined />
                    <a className='job-experience'>
                      Kinh nghiệm
                      <span>{selectedJob?.experience || "Not specified"}</span>
                    </a>
                  </p>
                </div>
                <button className="apply-button">Ứng tuyển ngay</button>
                <button className="save-button">Lưu tin</button>
              </div>
              <div className='job-company'>
                <div className="company-info">
                  <h4>{selectedJob?.employerResponse.companyName || "Company Name"}</h4>
                  <button className="link-button">Xem trang công ty</button>
                  <hr />
                  <div>
                    <p>Quy mô: 25-99 nhân viên</p>
                    <p>Lĩnh vực: Thiết kế / kiến trúc</p>
                    <p>Địa điểm: Số 130 đường Hoàng Công Chất, Phường Phú Diễn...</p>
                  </div>
                </div>

                <div className="general-info">
                  <h4>Thông tin chung</h4>
                  <p>Cấp bậc: Nhân viên</p>
                  <p>Kinh nghiệm: {selectedJob?.experience || "Không yêu cầu"}</p>
                  <p>Số lượng tuyển: 3 người</p>
                  <p>Hình thức làm việc: Toàn thời gian</p>
                  <p>Giới tính: Không yêu cầu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileJob;
