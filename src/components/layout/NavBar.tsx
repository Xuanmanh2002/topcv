import React, { useState } from 'react';
import { DoubleRightOutlined, DownOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';

const Navbar = () => {
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    const menuItems = ['Việc làm', 'Hồ sơ & CV', 'Công ty', 'Công cụ', 'Cẩm nang nghề nghiệp'];

    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <div className="navbar-menu-logo">
                    <img src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png" alt="Logo" width="100" height="auto" />
                </div>
                <ul className="navbar-menu-item">
                        {menuItems.map((menuItem) => (
                            <li
                                key={menuItem}
                                onClick={() => handleMenuClick(menuItem)}
                                style={{
                                    color: selectedMenu === menuItem ? 'green' : 'black',
                                    cursor: 'pointer',
                                }}
                            >
                                {menuItem}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="navbar-login">
                <div className="navbar-login-question">
                    <span>Bạn là nhà tuyển dụng?</span>
                    <div className='buttonEmployer'>
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
                    <div className="navbar-login-user-profile">
                        <a className="navbar-login-user-profile-image">
                            <img src="https://i.redd.it/ilsap0rwt9qb1.jpg" alt="User" />
                        </a>
                        <a className="navbar-login-user-profile-button">
                            <DownOutlined className="down-icon" />
                        </a>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
