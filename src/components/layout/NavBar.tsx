import React, { useState, useEffect, useContext } from 'react';
import { DoubleRightOutlined, DownOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { AuthContext } from '../auth/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [showAccount, setShowAccount] = useState(false);
    const [customer, setCustomer] = useState({
        adminId: "",
        firstName: "",
        lastName: "",
        avatar: "",
        email: ""
    });
    const { handleLogout } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const storedCustomer = {
            adminId: localStorage.getItem("adminId") || "",
            firstName: localStorage.getItem("firstName") || "",
            lastName: localStorage.getItem("lastName") || "",
            avatar: localStorage.getItem("avatar") || "",
            email: localStorage.getItem("email") || "",
        };
        setCustomer(storedCustomer);
    }, []);

    const handleMenuClick = (menu: string, path: string) => {
        navigate(path); 
    };

    const toggleDropdown = () => {
        setShowAccount(!showAccount);
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/dang-nhap');
    };

    const getMenuColor = (menu: string) => {
        return location.pathname === menu ? 'green' : 'black';
    };

    return (
        <div className='container'>
            <nav className="navbar">
                <div className="navbar-menu">
                    <div className="navbar-menu-logo">
                        <a href="/">
                            <img src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png" alt="Logo" width="100" height="auto" />
                        </a>
                    </div>
                    <ul className="navbar-menu-item">
                        <li
                            onClick={() => handleMenuClick("/viec-lam", "/viec-lam")}
                            style={{
                                color: getMenuColor("/viec-lam"),
                                cursor: 'pointer',
                            }}
                        >
                            Việc làm
                        </li>
                        {/* <li
                            onClick={() => handleMenuClick("/quan-ly-cv", "/quan-ly-cv")}
                            style={{
                                color: getMenuColor("/quan-ly-cv"),
                                cursor: 'pointer',
                            }}
                        >
                            Hồ sơ & CV
                        </li> */}
                        <li
                            onClick={() => handleMenuClick("/cong-ty", "/cong-ty")}
                            style={{
                                color: getMenuColor("/cong-ty"),
                                cursor: 'pointer',
                            }}
                        >
                            Công ty
                        </li>
                    </ul>
                </div>
                <div className="navbar-login">
                    {isLoggedIn ? (
                        <>
                            <div className="navbar-login-question">
                                <span>Bạn là nhà tuyển dụng?</span>
                                <div className="buttonEmployer">
                                    <a type="primary">Đăng tuyển ngay <DoubleRightOutlined /></a>
                                </div>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="navbar-login-user">
                                <div className="navbar-login-user-notification">
                                    <div className="navbar-login-user-notification-item bell">
                                        <BellOutlined />
                                    </div>
                                    <div className="navbar-login-user-notification-item mess">
                                        <MessageOutlined />
                                    </div>
                                </div>
                                <div className="navbar-login-user-profile" onClick={toggleDropdown}>
                                    <a className="navbar-login-user-profile-image">
                                        <img
                                            alt="Avatar"
                                            src={
                                                customer.avatar
                                                    ? `data:image/jpeg;base64,${customer.avatar}`
                                                    : "/path/to/default-image.jpg"
                                            }
                                        />
                                    </a>
                                    <a className="navbar-login-user-profile-button">
                                        <DownOutlined className="down-icon" />
                                    </a>
                                    {showAccount && (
                                        <div className="dropdown-menu">
                                            <div className='menu-infor'>
                                                <img
                                                    alt="Avatar"
                                                    src={
                                                        customer.avatar
                                                            ? `data:image/jpeg;base64,${customer.avatar}`
                                                            : "/path/to/default-image.jpg"
                                                    }
                                                />
                                                <div className="user-info">
                                                    <p className="user-name">{customer?.firstName} {customer?.lastName}</p>
                                                    <p className="user-id">Mã ứng viên: <span style={{ fontWeight: 'bold' }}>#{customer?.adminId}</span></p>
                                                    <p className="user-email">{customer?.email}</p>
                                                </div>
                                            </div>
                                            <ul>
                                                <li onClick={() => handleMenuClick("/cai-dat-thong-tin-ca-nhan", "/cai-dat-thong-tin-ca-nhan")}>Cài đặt thông tin cá nhân</li>
                                                <li onClick={() => handleMenuClick("/cv-cua-toi", "/cv-cua-toi")}>Quản lí hồ sơ xin việc</li>
                                                <li>Đổi mật khẩu</li>
                                                <li className="logout" onClick={handleLogoutClick}>Đăng xuất</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="button-container">
                            <Button className="button-link" type="link" onClick={() => navigate('/dang-nhap')}>Đăng nhập</Button>
                            <Button className="button-primary" type="link" onClick={() => navigate('/dang-ky')}>Đăng ký</Button>
                            <Button className="button-default" type="default">Đăng tuyển & tìm hồ sơ</Button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
