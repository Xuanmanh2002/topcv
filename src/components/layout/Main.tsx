import { useState } from 'react';
import { EnvironmentOutlined, DownOutlined, ShoppingOutlined, SearchOutlined } from '@ant-design/icons';
import JobList from './JobList';


const Main = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(searchTerm);
    };

    return (
        <main className="container">
            <div className='main-form'>
                <div className="main-form-header">
                    <h1 className='main-form-header-title'>Tìm việc làm nhanh 24h, việc làm mới nhất toàn quốc.</h1>
                    <p className='main-form-header-description'>
                        Tiếp cận <span className='main-form-header-description-number-hight-light'>40,000+</span> tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
                    </p>
                </div>

                <form className="main-form-search">
                    <div className="main-form-search-item">
                        <input
                            className="main-form-search-item-form-Job"
                            type="text"
                            placeholder="Vị trí tuyển dụng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="vertical-line"></div>
                    <div className="main-form-search-item-select">
                        <EnvironmentOutlined className="main-form-search-item-select-location-icon" />
                        <select className="main-form-search-item-select-location">
                            <option value="Nghệ An">Nghệ An</option>
                        </select>
                        <DownOutlined className="main-form-search-item-select-item-down" />
                    </div>
                    <div className="vertical-line"></div>
                    <div className="main-form-search-item-select">
                        <ShoppingOutlined className="main-form-search-item-select-bag-icon" />
                        <select className="main-form-search-item-select-industry">
                            <option value="Tất cả ngành nghề">Tất cả ngành nghề</option>
                        </select>
                        <DownOutlined className="main-form-search-item-select-item-down" />
                    </div>
                    <div className="vertical-line"></div>
                    <div className='main-form-search-button'>
                        <SearchOutlined className="main-form-search-button-icon" />
                        <button className="main-form-search-button-icon-onlick" onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </form>

                <div className='main-form-information'>
                    <div className="main-form-information-item">
                        <span className="main-form-information-item-infor">Vị trí chờ bạn khám phá</span>
                        <span className="main-form-information-item-quantity">42.645</span>
                    </div>
                    <div className="main-form-information-item">
                        <span className="main-form-information-item-infor">Việc làm mới nhất</span>
                        <span className="main-form-information-item-quantity">2.512</span>
                    </div>
                    <div className="main-form-information-item">
                        <span className="main-form-information-item-infor">Cập nhật lúc</span>
                        <span className="main-form-information-item-quantity">08:27 26/09/2024</span>
                    </div>
                </div>

                <div className="main-form-banner">
                    <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Camp10_CVO_1100x220_1909.png" alt="Banner" />
                </div>
            </div>
            <JobList />
        </main>



    );
};

export default Main;
