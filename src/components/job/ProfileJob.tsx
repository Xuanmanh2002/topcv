import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getJobById, getAllCategory, getAllAddress, createApplication, createReport } from '../utils/ApiFunctions';
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
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const ProfileJob = () => {
  const navigate = useNavigate();
  interface Category {
    id: number;
    categoryName: string;
  }

  interface Address {
    id: number;
    name: string;
  }

  interface Report {
    fullName: string;
    email: string;
    telephone: string;
    letter: string;
    address: string;
    jobId: number;
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

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [letter, setLetter] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [applicationError, setApplicationError] = useState<string | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  const openNotification = (type: 'success' | 'error', message: string, description?: string) => {
    notification[type]({
      message,
      description,
      placement: 'topRight',
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCv(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e: FormEvent) => {
    e.preventDefault();
    if (!jobs || !cv) {
      openNotification('error', 'Lỗi', 'Chọn công việc và CV hợp lệ trước khi nộp.');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        openNotification('error', 'Lỗi', 'Vui lòng đăng nhập để nộp hồ sơ.');
        navigate('/dang-nhap', { state: { message: "Vui lòng đăng nhập để nộp hồ sơ." } });
        return;
      }

      await createApplication(fullName, email, telephone, letter, cv, jobs.id, token);
      openNotification('success', 'Thành công', 'Nộp hồ sơ thành công!');
      setIsModalOpen(false);
    } catch (error: any) {
      openNotification('error', 'Lỗi', error.message || 'Đã xảy ra lỗi khi nộp hồ sơ.');
    }
  };

  const handleSubmitReport = async (e: FormEvent) => {
    e.preventDefault();
    if (!jobs) {
      openNotification('error', 'Lỗi', 'Không thể gửi báo cáo vì thiếu thông tin công việc.');
      return;
    }

    try {
      const reportRequest: Report = {
        fullName,
        email,
        telephone,
        letter,
        address,
        jobId: jobs.id
      };

      await createReport(reportRequest);
      openNotification('success', 'Thành công', 'Báo cáo đã được gửi thành công!');
      setIsReportModalOpen(false);
      setReportSuccess('Báo cáo đã được gửi thành công.');
    } catch (error: any) {
      openNotification('error', 'Lỗi', error.message || 'Đã xảy ra lỗi khi gửi báo cáo.');
      setReportError(error.message || 'Đã xảy ra lỗi.');
    }
  };
  const openModal = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/dang-nhap', { state: { message: "Vui lòng đăng nhập để ứng tuyển." } });
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openReportModal = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/dang-nhap', { state: { message: "Vui lòng đăng nhập để phản ánh." } });
      return;
    }
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobId = Number(localStorage.getItem("id"));
        if (isNaN(jobId)) {
          throw new Error("ID không hợp lệ.");
        }
        const jobData = await getJobById(jobId);
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching job data:", error);
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

    fetchJobData();
    fetchAddresses();
    fetchCategories();
  }, []);

  const formattedDeadline = jobs?.applicationDeadline
    ? format(new Date(jobs.applicationDeadline), 'dd/MM/yyyy')
    : "Not specified";

  const handleCompanyClick = (companyName: string, email: string) => {
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('email', email);
    console.log(companyName, email);
    navigate(`/cong-ty/${companyName}`);
  };
  return (
    <div className='container'>
      <div className="job-detail-layout">
        <SearchForm />
        <div className='job-detail-main'>
          <div className="job-detail-content">
            <div className="job-navbar">
              <div className="job-link-group">
                <Link className="job-link" to="/">
                  Trang chủ
                </Link>
                <FaChevronRight className="icon-divider" />
                <Link className="job-link" to="/viec-lam">
                  Tìm việc làm
                </Link>
                <FaChevronRight className="icon-divider" />
                <Link
                  className="job-link-namejob"
                  to={`/jobs/${jobs?.id}`}
                  style={{ color: "black" }}
                >
                  {jobs?.jobName || "Job Name"}
                </Link>
              </div>
            </div>
            <div className='job-company-profile'>
              <div className='job-company-profile-description'>
                <div className="job-card">
                  <h3>{jobs?.jobName || "Job Title Placeholder"}</h3>
                  <div className="job-info">
                    <p>
                      <FaDollarSign />
                      <a className='job-price'>
                        Mức lương
                        <span>{jobs?.price || "Not specified"}</span>
                      </a>
                    </p>
                    <p>
                      <FaMapMarkerAlt />
                      <a className='job-location'>
                        Địa điểm
                        <span>{
                          addresses.find((addr) => addr.id === Number(jobs?.employerResponse?.addressId))?.name || "Unknown"
                        }</span>
                      </a>
                    </p>
                    <p>
                      <HourglassOutlined />
                      <a className='job-experience'>
                        Kinh nghiệm
                        <span>{jobs?.experience || "Not specified"}</span>
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
                            <h2>Ứng tuyển <span>{jobs?.jobName || "Job Name"}</span></h2>
                            <button onClick={closeModal} className="modal-job-close-button">×</button>
                          </div>
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
                    <p>- <span>{jobs?.recruitmentDetails || "Not specified"}</span></p>
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
                      <span onClick={openReportModal}> hãy phản ánh với chúng tôi</span>
                      {isReportModalOpen && (
                        <div className="modal-job-overlay">
                          <div className="modal-job-content">
                            <div className='modal-report-name-button'>
                              <h2>Phản ánh tin tuyển dụng không chính xác
                              </h2>
                              <button onClick={closeReportModal} className="modal-job-close-button">×</button>
                            </div>
                            <p className='modal-report-describe'>Hãy tìm hiểu kỹ về nhà tuyển dụng và công việc bạn ứng tuyển. Bạn nên cẩn trọng với những công việc yêu cầu nộp phí, hoặc những hợp đồng mập mờ, không rõ ràng.
                              <br />
                              Nếu bạn thấy rằng tin tuyển dụng này không đúng, hãy phản ánh với chúng tôi.</p>
                            <form className="modal-job-apply-form" onSubmit={handleSubmitReport}>
                              <div className="modal-report-form-section">
                                <label className="modal-report-label">Tin tuyển dụng:</label>
                                <div className='modal-report-job'>{jobs?.jobName}</div>
                              </div>
                              <div className="modal-job-form-group">
                                <label>Họ và tên *</label>
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ và tên " required />
                              </div>
                              <div className="modal-job-form-group">
                                <label>Email *</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                              </div>
                              <div className="modal-job-form-group">
                                <label>Số điện thoại *</label>
                                <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Số điện thoại" required />
                              </div>
                              <div className="modal-job-form-group">
                                <label>Địa chỉ *</label>
                                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Địa chỉ' required />
                              </div>
                              <div className="modal-job-form-group">
                                <label>Nội dung</label>
                                <textarea id="letter" value={letter} onChange={(e) => setLetter(e.target.value)} placeholder="Bạn vui lòng cung cấp rõ thông tin hoặc bất kỳ bằng chứng(nếu có) để TopCV xử lý trong thời gian sớm nhất"></textarea>
                              </div>
                              <div className="modal-job-button-group">
                                <button type="button" onClick={closeReportModal} className="modal-job-cancel-button">Hủy</button>
                                <button type="submit" className="modal-submit-button">Gửi Báo Cáo</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
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
                        src={jobs?.employerResponse.avatar ? `data:image/jpeg;base64,${jobs?.employerResponse.avatar}` : "default-avatar-url.jpg"}
                        alt={jobs?.jobName}
                      />
                    </div>
                    <h4>{jobs?.employerResponse.companyName || "Company Name"}</h4>
                  </div>
                  <div className='company-info-form'>
                    <div>
                      <p className="icon-text"><MdOutlineSupervisorAccount /> <span>Quy mô: {jobs?.employerResponse.scale || "Company Name"} nhân viên</span></p>
                      <p className="icon-text"><FaCube /> <span>Lĩnh vực: {jobs?.employerResponse.fieldActivity || "Company Name"}</span></p>
                      <p className="icon-text"><FaLocationDot /> <span>Địa điểm:</span>
                        <span style={{ marginLeft: '4px' }}>
                          {addresses.find(addr => addr.id === Number(jobs?.employerResponse?.addressId))?.name || "Unknown"}
                        </span>
                      </p>
                    </div>
                  </div>
                  {jobs?.employerResponse && (
                    <div
                      key={jobs.employerResponse.id}
                      onClick={() =>
                        handleCompanyClick(
                          jobs.employerResponse.companyName,
                          jobs.employerResponse.email
                        )
                      }
                      className="company-link-button"
                    >
                      <button className="link-button">
                        Xem trang công ty <RiEditBoxLine />
                      </button>
                    </div>
                  )}
                </div>

                <div className="general-info">
                  <h4>Thông tin chung</h4>
                  <div className='general-info-company'>
                    <p>Cấp bậc: <span> {jobs?.ranker} </span> </p>
                    <p>Kinh nghiệm: <span>{jobs?.experience}</span></p>
                    <p>Số lượng tuyển: <span>{jobs?.quantity} người</span></p>
                    <p>Hình thức làm việc: <span>{jobs?.workingForm}</span></p>
                    <p>Giới tính: <span>{jobs?.gender}</span></p>
                  </div>
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
