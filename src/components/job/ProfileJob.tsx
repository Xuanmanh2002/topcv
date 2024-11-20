import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getAllJob, getAllCategory, getAllAddress, createApplication } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaMapMarkerAlt, FaChevronRight, FaCube } from 'react-icons/fa';
import { CiHeart, CiClock1, CiBellOn } from "react-icons/ci";
import { PiPaperPlaneTiltThin } from "react-icons/pi";
import { HourglassOutlined } from '@ant-design/icons';
import { MdOutlineReportGmailerrorred, MdOutlineSupervisorAccount } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import SearchForm from './SearchForm';
import { format } from 'date-fns';

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
  }

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [letter, setLetter] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [applicationError, setApplicationError] = useState<string | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCv(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !cv) {
      setApplicationError("Chọn công việc và CV hợp lệ trước khi nộp.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setApplicationError("Token không hợp lệ. Vui lòng đăng nhập lại.");
        return;
      }

      const response = await createApplication(fullName, email, telephone, letter, cv, Number(selectedJob.id), token); // Include the token
      setApplicationSuccess("Nộp hồ sơ thành công!");
      setApplicationError(null);
    } catch (error: any) {
      setApplicationError(error.message || "Đã xảy ra lỗi khi nộp hồ sơ.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const formattedDeadline = selectedJob?.applicationDeadline
    ? format(new Date(selectedJob.applicationDeadline), 'dd/MM/yyyy')
    : "Not specified";
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
              <div className='job-company-profile-description'>
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
                  <div className="job-deadline">
                    <CiClock1 />
                    <a>
                      Hạn nạp hồ sơ: {formattedDeadline}
                    </a>
                  </div>
                  <div className="button-group">
                    <button className="apply-button" onClick={openModal}>
                      <PiPaperPlaneTiltThin />
                      Ứng tuyển ngay
                    </button>
                    {isModalOpen && (
                      <div className="modal-job-overlay">
                        <div className="modal-job-content">
                          <div className='modal-job-name-button'>
                            <h2>Ứng tuyển <span>{selectedJob?.jobName || "Job Name"}</span></h2>
                            <button onClick={closeModal} className="modal-job-close-button">×</button>
                          </div>
                          {applicationError && <p className="error-message">{applicationError}</p>}
                            {applicationSuccess && <p className="success-message">{applicationSuccess}</p>}
                          <form className="modal-job-apply-form" onSubmit={handleSubmitApplication}>
                            <div className="modal-job-form-section">
                              <label className="modal-job-upload-label">Chọn CV để ứng tuyển:</label>
                              <input type="file" accept=".doc,.docx,.pdf" className="modal-job-file-input" onChange={handleFileChange} required />
                              <small>Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB</small>
                            </div>
                            <div className="modal-job-form-group">
                              <label>Họ và tên *</label>
                              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ tên hiển thị với NTD" required />
                            </div>
                            <div className="modal-job-form-group">
                              <label>Email *</label>
                              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email hiển thị với NTD" required />
                            </div>
                            <div className="modal-job-form-group">
                              <label>Số điện thoại *</label>
                              <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Số điện thoại hiển thị với NTD" required />
                            </div>
                            <div className="modal-job-form-group">
                              <label>Thư giới thiệu</label>
                              <textarea value={letter} onChange={(e) => setLetter(e.target.value)} placeholder="Viết giới thiệu ngắn gọn..."></textarea>
                            </div>
                            <div className="modal-job-button-group">
                              <button type="button" onClick={closeModal} className="modal-job-cancel-button">Hủy</button>
                              <button type="submit" className="modal-submit-button">Nộp hồ sơ ứng tuyển</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    <button className="save-button">
                      <CiHeart style={{ fontSize: "18px", fontWeight: "bold" }} />
                      Lưu tin
                    </button>
                  </div>
                </div>
                <div className='job-description'>
                  <div className='job-description-title'>
                    <a>Chi tiết tuyển dụng</a>
                    <a>
                      <CiBellOn />
                      Gửi tôi việc làm tương tự
                    </a>
                  </div>
                  <div className='job-desctiption-recruitment'>
                    <a>Mô tả công việc</a>
                    <p>- <span>{selectedJob?.recruitmentDetails || "Not specified"}</span></p>
                  </div>
                  <div className="job-desctiption-recruitment-deadline">
                    <a>
                      Hạn nạp hồ sơ: {formattedDeadline}
                    </a>
                  </div>
                  <div className="job-desctiption-recruitment-button-group">
                    <button className="job-desctiption-recruitment-apply-button" onClick={openModal}>
                      Ứng tuyển ngay
                    </button>
                    <button className="job-desctiption-recruitment-save-button">
                      Lưu tin
                    </button>
                  </div>
                  <div className='job-desctiption-report'>
                    <MdOutlineReportGmailerrorred />
                    <a>Báo cáo tin tuyển dụng. Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có dấu hiệu lừa đảo,
                      <span>hãy phản ánh với chúng tôi</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className='job-company'>
                <div className="company-info">
                  <div className='company-info-logo-name'>
                    <div className='job-company-image'>
                      <img
                        className="job-company-logo"
                        src={selectedJob?.employerResponse.avatar ? `data:image/jpeg;base64,${selectedJob?.employerResponse.avatar}` : "default-avatar-url.jpg"}
                        alt={selectedJob?.jobName}
                      />
                    </div>
                    <h4>{selectedJob?.employerResponse.companyName || "Company Name"}</h4>
                  </div>
                  <div className='company-info-form'>
                    <div>
                      <p className="icon-text"><MdOutlineSupervisorAccount /> <span>Quy mô: 25-99 nhân viên</span></p>
                      <p className="icon-text"><FaCube /> <span>Lĩnh vực: Thiết kế / kiến trúc</span></p>
                      <p className="icon-text"><FaLocationDot /> <span>Địa điểm:</span>
                        <span style={{ marginLeft: '4px' }}>
                          {addresses.find(addr => addr.id === Number(selectedJob?.employerResponse?.addressId))?.name || "Unknown"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='company-link-button'>
                    <button className="link-button">Xem trang công ty <RiEditBoxLine /></button>
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
