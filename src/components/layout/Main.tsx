// components/SearchBar.js
import { useState } from 'react';
import { EnvironmentOutlined, DownOutlined } from '@ant-design/icons';


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(searchTerm);
    };

    return (
        <div className='main-form'>
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
                        <EnvironmentOutlined />
                        <select className="select-location">
                            <option value="Nghệ An">Nghệ An</option>
                        </select>
                        <DownOutlined />
                    </div>
                    <div className="vertical-line"></div>
                    <div className="item-select">
                        <select className="select-industry">
                            <option value="Tất cả ngành nghề">Tất cả ngành nghề</option>
                        </select>
                    </div>
                    <div className="vertical-line"></div>
                    <button className="search-button" onClick={handleSearch}>Tìm kiếm</button>
            </form>

            <div className='information'>
                <div>
                    <h1>Vị trí chờ bạn khám phá</h1>
                    <h2>43.400</h2>
                </div>
                <div>
                    <h1>Việc làm mới nhất</h1>
                    <h2>3.092</h2>
                </div>
                <div>
                    <h1>Cập nhật lúc</h1>
                    <h2>11:24 25/09/2024</h2>
                </div>
            </div>

            <div className="banner">
                <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Camp10_CVO_1100x220_1909.png" alt="Banner" />
            </div>
        </div>


    );
};

export default SearchBar;
