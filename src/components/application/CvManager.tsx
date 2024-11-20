import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import { IoMdAdd } from "react-icons/io";
import noCvImage from '../../assets/img/no-cv.webp';
import noProfile from '../../assets/img/no-profile.webp';
import bannerApp from "../../assets/img/banner--app.webp";
import banner_magger from '../../assets/img/bg_banner_horoscope_magager_cv.webp'
import { PiUploadSimpleBold } from "react-icons/pi";
import { FaStar, FaShare } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { HiDownload } from "react-icons/hi";
import { CiCamera, CiTrash  } from "react-icons/ci";
import { MdUpgrade, MdOutlineReportGmailerrorred } from "react-icons/md";
import { TiTick } from "react-icons/ti";

interface CV {
    id: string;
    title: string;
    updatedDate: string;
}

interface Customer {
    adminId: string;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
}

const CvManager: React.FC = () => {
    const [isJobSearching, setIsJobSearching] = useState(false);
    const [isProfileSearchable, setIsProfileSearchable] = useState(true);
    const [customer, setCustomer] = useState<Customer>({
        adminId: "",
        firstName: "",
        lastName: "",
        avatar: "",
        email: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleJobSearchToggle = (checked: boolean) => {
        setIsJobSearching(checked);
    };

    const handleProfileSearchableToggle = (checked: boolean) => {
        setIsProfileSearchable(checked);
    };

    const uploadedCVs: CV[] = [
        { id: '1', title: 'CV-INTERNSHIP', updatedDate: '11-11-2024 18:44' },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const storedCustomer: Customer = {
            adminId: localStorage.getItem("adminId") || "",
            firstName: localStorage.getItem("firstName") || "",
            lastName: localStorage.getItem("lastName") || "",
            avatar: localStorage.getItem("avatar") || "",
            email: localStorage.getItem("email") || "",
        };
        setCustomer(storedCustomer);
    }, []);

    return (
        <div className="cv-manager-container">
            <div className="cv-manager-header">
                <div className="cv-section">
                    <div className="cv-card">
                        <div className="cv-card-header">
                            <h2>CV đã tạo trên TopCV</h2>
                            <button className="btn-primary"><IoMdAdd className='btn-add' /> Tạo mới</button>
                        </div>
                        <div className="cv-create-section">
                            <img src={noCvImage} alt="No CV Available" className='cv-img' />
                            <p>Bạn chưa tạo CV nào</p>
                        </div>
                    </div>

                    <div className="cv-card">
                        <div className="cv-card-header">
                            <h2>CV đã tải lên TopCV</h2>
                            <button className="btn-uploads"><PiUploadSimpleBold className='btn-add' /> Tải CV lên</button>
                        </div>
                        {uploadedCVs.map((cv) => (
                            <div key={cv.id} className="cv-upload-section">
                                <div className="cv-thumbnail-container">
                                    <div className="cv-image-overlay">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBzMgk9tQqbzwnv2DWRLfh_4G_LvQeqBMT3Q&s"
                                            alt="CV Thumbnail"
                                            className="cv-thumbnail"
                                        />
                                        <button className="cv-main-button"><FaStar /> Đặt làm CV chính</button>
                                        <h4 className="cv-title">{cv.title}.pdf <GoPencil className='cv-edit-name' /></h4>
                                        <p className="cv-updated-date">Cập nhật lần cuối {cv.updatedDate}</p>
                                        <div className="cv-buttons">
                                            <button className="btn-default"><FaShare /> Chia sẻ</button>
                                            <button className="btn-link"><HiDownload /> Tải xuống</button>
                                            <CiTrash className='btn-delete-cv'/>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cv-card">
                        <div className="cv-card-header">
                            <h2>TopCV Profile</h2>
                            <button className="btn-primary"><IoMdAdd className='btn-add' /> Tạo mới</button>
                        </div>
                        <div className="cv-create-section">
                            <img src={noProfile} alt="No CV Available" className='cv-img' />
                            <p>Bạn chưa tạo TopCV Profile</p>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <div className='profile-card'>
                        <div className="profile-card-customer">
                            <div className="avatar-container">
                                <img
                                    alt="Avatar"
                                    src={
                                        customer.avatar
                                            ? `data:image/jpeg;base64,${customer.avatar}`
                                            : "/path/to/default-image.jpg"
                                    }
                                />
                                <CiCamera className="camera-icon" />
                            </div>
                            <div className="profile-name-customer">
                                <p>Chào bạn trở lại,</p>
                                <h2>{customer.firstName} {customer.lastName}</h2>
                                <span className="verified-account">Tài khoản đã xác thực</span>
                                <button className="upgrade-button"><MdUpgrade className='upgrade-icon' /> Nâng cấp tài khoản</button>
                            </div>
                            <hr />
                        </div>
                        <div className="toggle-section">
                            <div className="toggle-item">
                                <Switch
                                    checked={isJobSearching}
                                    onChange={handleJobSearchToggle}
                                    checkedChildren="On"
                                    unCheckedChildren="Off"
                                    style={{
                                        backgroundColor: isJobSearching ? "#00B14F" : "#000000",
                                    }}
                                />
                                <span style={{ color: isJobSearching ? "#00B14F" : "#000000", fontSize: "14px" }}>
                                    {isJobSearching ? "Đang Tìm việc" : "Đang Tắt tìm việc"}
                                </span>
                            </div>
                            <p className='find-a-job'>Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trong danh sách tìm kiếm của NTD.</p>

                            <div className="toggle-item">
                                <Switch
                                    checked={isProfileSearchable}
                                    onChange={handleProfileSearchableToggle}
                                    checkedChildren="On"
                                    unCheckedChildren="Off"
                                    style={{
                                        backgroundColor: isProfileSearchable ? "#00B14F" : "#000000",
                                    }}
                                />
                                <span style={{ color: isProfileSearchable ? "#00B14F" : "#000000", fontSize: "14px" }}>
                                    {isProfileSearchable ? "Cho phép NTD tìm kiếm hồ sơ" : "Chưa cho phép NTD tìm kiếm hồ sơ"}
                                </span>
                            </div>
                            <p className='toggle-accept'>Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ với bạn qua:</p>
                            <p className='toggle-accept'><TiTick /> Nhắn tin qua Top Connect trên TopCV</p>
                            <p className='toggle-accept'><TiTick /> Email và Số điện thoại của bạn</p>
                            <img className='toggle-banner' src={bannerApp} />
                            <hr />
                            <div className='cv-report'>
                                <MdOutlineReportGmailerrorred />
                                <a>
                                    Bạn cần hoàn thiện trên 70% TopCV Profile để bắt đầu tiếp cận với nhà tuyển dụng
                                </a>
                            </div>
                            <button className='button-update'>Cập nhật TopCV Profile</button>
                        </div>
                    </div>
                    <div className='cv-banner-section'>
                        <img src={banner_magger} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CvManager;
