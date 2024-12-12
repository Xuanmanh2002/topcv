import React from 'react'
import SearchForm from './SearchForm';
import { FaChevronRight } from 'react-icons/fa';
import { CiBellOn } from "react-icons/ci";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

const JobSearch = () => {
    return (
        <div className='container'>
            <div className="job-detail-layout">
                <SearchForm />
                <div className='job-search-container'>
                    <div className='job-search-navbar'>
                        <div className='job-search-navbar-title'>
                            <h1 className='job-search-navbar-heading'>Tuyển dụng 42.275 việc làm [Update 11/12/2024]</h1>
                            <div className='job-search-navbar-link'>
                                <ul className='job-search-navbar-item'>
                                    <li className='job-search-navbar-item-custome'>
                                        <a>Trang chủ</a>
                                    </li>
                                    <FaChevronRight className='job-search-icon-right' />
                                    <p className='job-search-icon-describe'>Tuyển dụng 42.275 việc làm 2024 [Update 11/12/2024]</p>
                                </ul>
                            </div>
                        </div>
                        <button className='job-search-navbar-btn-notification' >
                            <CiBellOn className='job-search-navbar-btn' />
                            <span>Tạo thông báo việc làm</span>
                        </button>
                    </div>
                </div>
                <div className='job-search-container'>
                    <div className='job-search-navbar-keyword'>
                        <div className='job-search-navbar-keyword-content'>
                            <div className='job-search-navbar-keyword-title'>Tìm kiếm theo:</div>
                            <div className='job-search-navbar-keyword-list'>
                                <div className='job-search-navbar-keyword-list-item' >
                                    <FaCheck className='job-search-navbar-keyword-list-check' />
                                    Tên việc làm
                                </div>
                                <div className='job-search-navbar-keyword-list-item' >
                                    <FaCheck className='job-search-navbar-keyword-list-check' />
                                    Tên công ty
                                </div>
                                <div className='job-search-navbar-keyword-list-item-active' >
                                    <FaCheck className='job-search-navbar-keyword-list-check-icon' />
                                    Cả hai
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='job-search-show-imporant'>
                                <span className='job-search-navbar-caption'>Ưu tiên hiển thị theo:</span>
                                <span className="job-search-navbar-select">
                                    <div className="custom-select-wrapper">
                                        <select className="job-search-navbar-select-form">
                                            <option>Search by AI</option>
                                            <option>Ngày đăng</option>
                                            <option>Ngày cập nhật</option>
                                            <option>Lương cao đến thấp</option>
                                            <option>Cần tuyển gấp</option>
                                        </select>
                                        <FaChevronDown className="job-search-chevron" />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='job-search-result'>
                    <div className='job-search-container'>
                        <div className='job-search-item'>
                            <div className='job-search-avatar'>
                                <a className='job-search-body-avatar'>
                                    <img src='https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/Gt6sWvWDXBqmPjwLL7CmKAvK5f31lbYe_1726107717____db1cc73322d3e4c29b7f5b7fdb1be9eb.png' />
                                </a>
                            </div>
                            <div className='job-search-body-profile'>
                                <div className='job-search-body-box'>
                                    <div className='job-search-body-box-content'>
                                        <div className='job-search-body-box-title'>
                                            <div>
                                                <h3 className='job-search-body-box-name'>
                                                    <a>
                                                        <span>
                                                            Nhân Viên Phục Vụ Nhà Hàng
                                                        </span>
                                                        <span className='icon-verified-employer-job'>
                                                            <IoMdCheckmark className='icon-verified-employer-job-checked' />
                                                        </span>
                                                    </a>
                                                </h3>
                                                <a className='job-search-body-company-name'>
                                                    <span className='company-name-content'>
                                                        TopCV - AVT: Cơ hội việc làm & Định cư lâu dài tại Đức
                                                    </span>
                                                </a>
                                            </div>
                                            <div className='job-search-box-right'>
                                                <label className='job-search-box-salary'>
                                                    70-90 triệu
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='job-search-body-info'>
                                        <div className='job-search-label-content'>
                                            <label className='job-search-address'>
                                                <span className='job-search-address-text'>
                                                    Đức, Toàn Quốc
                                                </span>
                                            </label>
                                            <label className='job-search-exp'>
                                                <span>
                                                    Dưới 1 năm
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='job-search-box-icon'>
                                    <div className='job-search-box-tag'>
                                        <a className='item-box-tag'>
                                            Việc làm phổ thông
                                        </a>
                                        <span className='item-box-tag'>Chuyên môn: Phục vụ</span>
                                    </div>
                                    <div className='item-box-icon'>
                                        <button className='apply-cv'>
                                            <span>Ứng tuyển</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobSearch
