import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import { FaChevronRight } from 'react-icons/fa';
import { CiBellOn } from "react-icons/ci";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdChevronRight } from "react-icons/md";
import { useParams, useNavigate } from 'react-router-dom';
import { getAllJobsByCategory, getAllAddress, getAllCategory } from '../utils/ApiFunctions';

interface Address {
  id: string;
  name: string;
}

interface Category {
  id: number;
  categoryName: string;
}

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
  avatar: string | null;
  scale: String;
  fieldActivity: String;
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

const JobCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [currentAddressPage, setCurrentAddressPage] = useState(1);
  const jobsPerPage = 12;
  const addressesPerPage = 5;

  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === Number(categoryId));
    return category ? category.categoryName : "Danh mục không xác định";
  };

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

  const indexOfLastJob = currentJobPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const indexOfLastAddress = currentAddressPage * addressesPerPage;
  const indexOfFirstAddress = indexOfLastAddress - addressesPerPage;
  const currentAddresses = addresses.slice(indexOfFirstAddress, indexOfLastAddress);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobsByCategory(Number(categoryId));
        setJobs(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
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

    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategory();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
    fetchJobs();
    fetchAddresses();
  }, [categoryId]);

  const handleJobClick = (jobName: string, id: number) => {
    localStorage.setItem('jobName', jobName);
    localStorage.setItem('id', id.toString());
    console.log(jobName, id);
    navigate(`/viec-lam/${id}`);
  };


  return (
    <div className='container'>
      <div className="job-detail-layout">
        <SearchForm />
        <div className='job-search-container'>
          <div className='job-search-navbar'>
            <div className='job-search-navbar-title'>
              <h1 className='job-search-navbar-heading'>Tuyển dụng việc làm {getCategoryName()} </h1>
              <div className='job-search-navbar-link'>
                <ul className='job-search-navbar-item'>
                  <li className='job-search-navbar-item-custome'>
                    <a>Trang chủ</a>
                  </li>
                  <FaChevronRight className='job-search-icon-right' />
                  <li className='job-search-navbar-item-custome' style={{ paddingLeft: "10px" }}>
                    <a>Việc làm</a>
                  </li>
                  <FaChevronRight className='job-search-icon-right' />
                  <p className='job-search-icon-describe' style={{ paddingLeft: "10px" }} >{getCategoryName()}</p>
                </ul>
              </div>
            </div>
            <button className='job-search-navbar-btn-notification' >
              <CiBellOn className='job-search-navbar-btn' />
              <span>Tạo thông báo việc làm</span>
            </button>
          </div>
        </div>
        <div className='job-search-container'>
          <div className='job-search-navbar-keyword'>
            <div className='job-search-navbar-keyword-content'>
              <div className='job-search-navbar-keyword-title'>Tìm kiếm theo:</div>
              <div className='job-search-navbar-keyword-list'>
                <div className='job-search-navbar-keyword-list-item' >
                  <FaCheck className='job-search-navbar-keyword-list-check' />
                  Tên việc làm
                </div>
                <div className='job-search-navbar-keyword-list-item' >
                  <FaCheck className='job-search-navbar-keyword-list-check' />
                  Tên công ty
                </div>
                <div className='job-search-navbar-keyword-list-item-active' >
                  <FaCheck className='job-search-navbar-keyword-list-check-icon' />
                  Cả hai
                </div>
              </div>
            </div>
            <div>
              <div className='job-search-show-imporant'>
                <span className='job-search-navbar-caption'>Ưu tiên hiển thị theo:</span>
                <span className="job-search-navbar-select">
                  <div className="custom-select-wrapper">
                    <select className="job-search-navbar-select-form">
                      <option>Search by AI</option>
                      <option>Ngày đăng</option>
                      <option>Ngày cập nhật</option>
                      <option>Lương cao đến thấp</option>
                      <option>Cần tuyển gấp</option>
                    </select>
                    <FaChevronDown className="job-search-chevron" />
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='job-search-result'>
          <div className='job-search-container'>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : jobs.length === 0 ? (
              <p>Chưa có bài tuyển dụng</p>
            ) : (
              jobs.map((job) => (
                <div className='job-search-item' key={job.id}>
                  <div className='job-search-avatar'>
                    <a className='job-search-body-avatar'>
                      <img src={job.employerResponse.avatar ? `data:image/jpeg;base64,${job.employerResponse.avatar}` : "default-avatar-url.jpg"} />
                    </a>
                  </div>
                  <div className='job-search-body-profile'>
                    <div className='job-search-body-box'>
                      <div className='job-search-body-box-content'>
                        <div className='job-search-body-box-title'>
                          <div>
                            <h3 className='job-search-body-box-name'>
                              <a>
                                <span onClick={() => handleJobClick(job.jobName, job.id)} style={{ paddingRight: "5px" }} >
                                  {job.jobName}
                                </span>
                                <span className='icon-verified-employer-job' >
                                  <IoMdCheckmark className='icon-verified-employer-job-checked' />
                                </span>
                              </a>
                            </h3>
                            <a className='job-search-body-company-name'>
                              <span className='company-name-content'>
                                {job.employerResponse.companyName}
                              </span>
                            </a>
                          </div>
                          <div className='job-search-box-right'>
                            <label className='job-search-box-salary'>
                              {job.price}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='job-search-body-info'>
                        <div className='job-search-label-content'>
                          <label className='job-search-address'>
                            <span className='job-search-address-text'>
                              {
                                addresses.find(address => address.id === job.employerResponse.addressId)?.name || "Địa chỉ không xác định"
                              }
                            </span>
                          </label>
                          <label className='job-search-exp'>
                            <span>
                              {job.experience} năm
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='job-search-box-icon'>
                      <div className='job-search-box-tag'>
                        <a className='item-box-tag'>
                          Việc làm phổ thông
                        </a>
                        <span className='item-box-tag'>Chuyên môn: {job.employerResponse.fieldActivity}</span>
                      </div>
                      <div className='item-box-icon'>
                        <button className='apply-cv'>
                          <span>Ứng tuyển</span>
                        </button>
                        <button className='eye-button'>
                          <FaEye className='eye-button-basic' />
                        </button>
                        <div className='box-save-job'>
                          <a className='job-save-button'>
                            <FaRegHeart className='job-button-heart' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className='box-pagination'>
              <ul className='pagination'>
                <li className='pagination-disabled' aria-disabled="true">
                  <MdKeyboardArrowLeft aria-hidden="true" className='button-left-page' onClick={handlePrevJobPage} />
                </li>
                <li className='box-page-number'>
                  <span className='page-number'>
                    <span className='page-number-high-light'>{currentJobPage} / </span> {Math.ceil(jobs.length / jobsPerPage)} trang
                  </span>
                </li>
                <li>
                  <MdChevronRight aria-hidden="true" className='button-right-page' onClick={handleNextJobPage} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCategory
