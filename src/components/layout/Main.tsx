import { useState } from 'react';
import { EnvironmentOutlined, DownOutlined, ShoppingOutlined, SearchOutlined } from '@ant-design/icons';
import JobList from './JobList';


const Main = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(searchTerm);
    };

    return (
        <div className="container">
            <div className='main-form '>
                <div className="header-box">
                    <h1 className='title'>Tìm việc làm nhanh 24h, việc làm mới nhất toàn quốc.</h1>
                    <p className='description'>
                        "Tiếp cận <span className='number-hight-light'>40,000+</span> tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam"
                    </p>
                </div>

                <form className="form-searchBar">
                    <div className="item-search">
                        <input
                            className="form-Job"
                            type="text"
                            placeholder="Vị trí tuyển dụng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="vertical-line"></div>
                    <div className="item-select">
                        <EnvironmentOutlined className="location-icon" />
                        <select className="select-location">
                            <option value="Nghệ An">Nghệ An</option>
                        </select>
                        <DownOutlined className="down" />
                    </div>
                    <div className="vertical-line"></div>
                    <div className="item-select">
                        <ShoppingOutlined className="bag-icon" />
                        <select className="select-industry">
                            <option value="Tất cả ngành nghề">Tất cả ngành nghề</option>
                        </select>
                        <DownOutlined className="down" />
                    </div>
                    <div className="vertical-line"></div>
                    <div className='button-search'>
                        <SearchOutlined className="search-icon" />
                        <button className="button" onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </form>

                <div className='information'>
                    <div className="infor1">
                        <span className="item1">Vị trí chờ bạn khám phá</span>
                        <span className="Quantity">42.645</span>
                    </div>
                    <div className="infor1">
                        <span className="item1">Việc làm mới nhất</span>
                        <span className="Quantity">2.512</span>
                    </div>
                    <div className="infor1">
                        <span className="item1">Cập nhật lúc</span>
                        <span className="Quantity">08:27 26/09/2024</span>
                    </div>
                </div>

                <div className="banner">
                    <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Camp10_CVO_1100x220_1909.png" alt="Banner" />
                </div>
            </div>
            <JobList />
        </div>



    );
};

export default Main;
