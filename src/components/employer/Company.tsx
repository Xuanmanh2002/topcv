import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaChevronRight,
    FaRegBuilding,
    FaUsers,
    FaChevronDown,
    FaHeart,
} from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { CiSearch, CiLocationOn } from 'react-icons/ci';
import { HiSearch } from 'react-icons/hi';
import { LiaMapSolid } from 'react-icons/lia';
import { getEmployer, getAllAddress, getJobsByAdminAndStatusTrue, createApplication } from '../utils/ApiFunctions';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
    avatar: string;
    rank: string;
    scale: string;
    fieldActivity: string;
}

interface Address {
    id: number;
    name: string;
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
const Company: React.FC = () => {
    const navigate = useNavigate();
    const [employer, setEmployer] = useState<EmployerResponse | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [letter, setLetter] = useState('');
    const [cv, setCv] = useState<File | null>(null);
    const [applicationError, setApplicationError] = useState<string | null>(null);
    const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentJobPage, setCurrentJobPage] = useState(1);
    const [currentAddressPage, setCurrentAddressPage] = useState(1);
    const jobsPerPage = 12;
    const addressesPerPage = 5;
    const [filteredJob, setFilteredJob] = useState<Job[]>([]);

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

    const handleSearch = (value: string) => {
        const filtered = jobs.filter((job) =>
            job.jobName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredJob(filtered);
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
        navigate(`/viec-lam/${id}`);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCv(e.target.files[0]);
        }
    };

    const handleSubmitApplication = async (e: FormEvent) => {
        e.preventDefault();

        if (!fullName || !email || !telephone || !letter || !cv) {
            setApplicationError("Vui lòng điền đầy đủ thông tin và chọn CV.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setApplicationError("Vui lòng đăng nhập để nộp hồ sơ.");
                navigate('dang-nhap', { state: { message: "Vui lòng đăng nhập để nộp hồ sơ." } });
                return;
            }

            if (!jobs || jobs.length === 0) {
                setApplicationError("Vui lòng chọn công việc hợp lệ.");
                return;
            }

            const response = await createApplication(fullName, email, telephone, letter, cv, Number(jobs[0].id), token);
            setApplicationSuccess("Nộp hồ sơ thành công!");
            setApplicationError(null);
        } catch (error: any) {
            setApplicationError(error.message || "Đã xảy ra lỗi khi nộp hồ sơ.");
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) throw new Error('Email không tồn tại trong localStorage.');

                const [employerData, fetchedAddresses] = await Promise.all([
                    getEmployer(email),
                    getAllAddress(),
                ]);

                if (!employerData) throw new Error('Không tìm thấy thông tin nhà tuyển dụng.');

                setEmployer(employerData);
                setAddresses(fetchedAddresses);

                const jobData = await getJobsByAdminAndStatusTrue(employerData.id);
                setJobs(jobData);
                setFilteredJob(jobData);
            } catch (err: any) {
                console.error('Error fetching data:', err);
                setError(err.message || 'Có lỗi xảy ra.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="company-container">
            <div className="company-title">
                <div className="company-title-link">
                    <Link className="company-link" to="/">
                        Trang chủ
                    </Link>
                    <FaChevronRight className="icon-divider" />
                    <Link className="company-link" to="/jobs">
                        Tìm việc làm
                    </Link>
                    <FaChevronRight className="icon-divider" />
                    <span style={{ color: "#212F3F" }}>{employer?.companyName || 'Loading...'}</span>
                </div>

                <div className="company-page">
                    <div className="company-header">
                        <div className="company-cover">
                            <img
                                src={employer?.avatar ? `data:image/png;base64,${employer?.avatar}` : '/default-avatar.png'}
                                alt="Employer Avatar"
                                className="company-cover-img"
                            />
                        </div>
                        <div className="company-logo">
                            <div className="company-image-logo">
                                <img
                                    src={employer?.avatar ? `data:image/png;base64,${employer?.avatar}` : '/default-avatar.png'}
                                    alt="Company Logo"
                                    className="img-responsive"
                                />
                            </div>
                            <div className="company-detail-overview">
                                <div className="box-detail">
                                    <h1 className="company-detail-name text-highlight">{employer?.companyName || 'Loading...'}</h1>
                                    <div className='company-subdetail'>
                                        {['gold', 'diamond'].includes(employer?.rank?.toLowerCase() || '') && (
                                            <div className='company-content__title--label'>
                                                <div className='job-pro-wrap brand-company'>
                                                    <span className='job-pro-icon'>
                                                        <a>Pro Company</a>
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <div className='company-subdetail-info'>
                                            <span className='company-subdetail-info-icon'>
                                                <FaRegBuilding />
                                            </span>
                                            <span className='company-subdetail-info-text'>{employer?.scale || 'Loading...'} nhân viên</span>
                                        </div>
                                        <div className='company-subdetail-info'>
                                            <span className='company-subdetail-info-icon'>
                                                <FaUsers />
                                            </span>
                                            <span className='company-subdetail-info-text'>25-99 người theo dõi</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='box-flow'>
                                    <a className='btn-follow'>
                                        <span>
                                            <IoMdAdd className='fa-regular fa-plus' />
                                        </span>
                                        Theo dõi công ty
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div id="section-introduce">
                                <div className="company-info-profile">
                                    <h2 className="title">Giới thiệu công ty</h2>
                                    <div className="box-body">
                                        <div className="content" style={{ maxHeight: "200px" }}>
                                            <div className='empty'>
                                                <img className='img-responsive' src='https://static.topcv.vn/v4/image/normal-company/mascot_empty.png' />
                                                <span>Chưa có thông tin công ty</span>
                                            </div>
                                            <div className="temp"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="job-listing box-white" id="box-job-listing">
                                <div className="job-listing__header">
                                    <h2 className="title">Tuyển dụng</h2>
                                </div>
                                <div className="box-body">
                                    <div className="box-search">
                                        <div className="input-group-location">
                                            <div className="input-group-prepend">
                                                <CiSearch style={{ width: 24, height: 24 }} />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="job-listing-name"
                                                placeholder="Tên công việc, vị trí ứng tuyển..."
                                                onChange={(e) => handleSearch(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-group select-cities-container">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <CiLocationOn style={{ width: 24, height: 24, color: "#0b14f" }} />
                                                </span>
                                            </div>
                                            <div className="custom-select">
                                                <select className="form-control">
                                                    <option value="">Chọn thành phố...</option>
                                                    {addresses.map((address) => (
                                                        <option key={address.id} value={address.id}>
                                                            {address.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <FaChevronDown
                                                    style={{
                                                        fontSize: 20,
                                                        color: "#00b14f",
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <Button type="primary" className="btn btn-search btn-search-job-company">
                                            <HiSearch className="fa-solid fa-magnifying-glass" />
                                            <span>Tìm kiếm</span>
                                        </Button>
                                    </div>
                                    <div className='box-content' id='job-listing-content'>
                                        {filteredJob.length > 0 ? (
                                            filteredJob.map((job) => (
                                                <div className='job-list-defaul'>
                                                    <div className='job-item-default-detail'>
                                                        <div className='company-avatar'>
                                                            <img src={job.employerResponse.avatar ? `data:image/png;base64,${job.employerResponse.avatar}` : '/default-avatar.png'} className="img-responsive" />
                                                        </div>
                                                        <div>
                                                            <div className='company-job-price' >
                                                                <h1 onClick={() => handleJobClick(job.jobName, job.id)}>
                                                                    {job?.jobName
                                                                        ? job.jobName.length > 30
                                                                            ? job.jobName.substring(0, 30) + "..."
                                                                            : job.jobName
                                                                        : "Loading..."}
                                                                </h1>
                                                                <span>{job.price}</span>
                                                            </div>
                                                            <div className='company-name-rank'>
                                                                {['Gold', 'Diamond'].includes(job?.employerResponse?.rank?.toLowerCase()) && (
                                                                    <span>Pro</span>
                                                                )}
                                                                <h2>{job?.employerResponse?.companyName}</h2>
                                                            </div>
                                                            <div className='company-location-icon'>
                                                                <div className='company-location-validity'>
                                                                    <span className='company-address'> {addresses.find((addr) => addr.id === Number(job?.employerResponse?.addressId))?.name || "Unknown"}</span>
                                                                    <span className='company-validity'> Còn
                                                                        <span> {Math.max(0, Math.ceil((new Date(job.applicationDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} </span>
                                                                        ngày ứng tuyển</span>
                                                                </div>
                                                                <div className='company-button-icon'>
                                                                    <button className='button-icon' onClick={openModal}>Ứng tuyển</button>
                                                                    {isModalOpen && (
                                                                        <div className="modal-job-overlay">
                                                                            <div className="modal-job-content">
                                                                                <div className='modal-job-name-button'>
                                                                                    <h2>Ứng tuyển <span>{job.jobName || "Job Name"}</span></h2>
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
                                                                    <FaHeart className='button-heart' />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='empty'>
                                                <img className='img-responsive' src='https://static.topcv.vn/v4/image/normal-company/mascot_empty.png' />
                                                <span>Chưa có công việc tuyển dụng</span>
                                            </div>
                                        )}
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
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div id='section-contact'>
                                <h2 className='title'>Thông tin liên hệ</h2>
                                <div className='box-body'>
                                    <div className='company-item'>
                                        <div className='box-caption'>
                                            <CiLocationOn className='fa-solid' />
                                            <span>Địa chỉ công ty</span>
                                        </div>
                                        <div className='desc'>
                                            {addresses.find(addr => addr.id === Number(employer?.addressId))?.name || "Unknown"}
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className='box-caption'>
                                            <LiaMapSolid className='company-map-icon' />
                                            <span>Xem bản đồ</span>
                                        </div>
                                        <div className='desc'>
                                            <iframe width="100%" height="297" style={{ border: 0 }} src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCVgO8KzHQ8iKcfqXgrMnUIGlD-piWiPpo&amp;q=Tang+2,toa+nha+FPT,Pho+Duy+Tan,Cau+Giay,Ha+Noi&amp;zoom=15&amp;language=vi" >
                                            </iframe>
                                        </div>
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

export default Company;
