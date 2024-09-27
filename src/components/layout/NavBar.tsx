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
                <div className="logoandmenu">
                    <div className='logo'>
                        <img src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png" alt="Logo" width="100" height="auto" />
                    </div>
                    <ul className="menu">
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
                <div className="employer">
                    <div className="inEmployer">
                        <span>Bạn là nhà tuyển dụng?</span>
                        <div className='buttonEmployer'>
                            <a type="primary">Đăng tuyển ngay <DoubleRightOutlined /></a>
                        </div>
                    </div>
                    <div className="vertical-line"/>
                    <div className="infor">
                        <div className="notification-buttons">
                            <div className="notification-icon bell">
                                <BellOutlined />
                            </div>
                            <div className="notification-icon mess">
                                <MessageOutlined />
                            </div>
                        </div>
                        <div className="user">
                            <a className="userimg">
                                <img src="https://i.redd.it/ilsap0rwt9qb1.jpg" alt="User" />
                            </a>
                            <a className="down-button">
                                <DownOutlined className="down-icon" />
                            </a>
                        </div>
                    </div>
                </div>

            </nav>
    );
};

export default Navbar;
