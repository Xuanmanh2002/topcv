import React from 'react'
import { FacebookOutlined, YoutubeOutlined, LinkedinOutlined, TikTokOutlined, PhoneOutlined, FileOutlined } from '@ant-design/icons';
import { BiSolidLocationPlus, BiFile, BiSolidFile } from "react-icons/bi";

const Footer = () => {
    return (
        <div className='container'>
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-top-left">
                        <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/logo/topcv-logo-footer-6.png" alt="TopCV Logo" className="footer-logo" />
                        <div className="footer-certifications">
                            <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/google_for_startup.png" className='footer-google-startup' alt="Google for Startups" />
                            <img src="https://images.dmca.com/Badges/DMCA_badge_grn_60w.png?ID=8be40718-7da1-4b43-875a-3efb819100c9" className="footer-google-security" alt="Omega" />
                            <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/bct.jpg" className="footer-google-subrice" alt="ISO Certification" />
                        </div>
                        <p>Hotline:<a className="footer-telephone">(024) 6680 5588 (Giờ hành chính)</a></p>
                        <p>Email: <a className="footer-email">hotro@topcv.vn</a></p>
                        <img className="footer-app" src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/download/app_store.png" alt="appstore" />
                        <img className="footer-app" src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/download/chplay.png" alt="googleplay" />
                        <div className="footer-icon-group">
                            <span className="footer-social-title">Cộng đồng Topcv</span>
                            <div className='footer-social-icon'>
                                <FacebookOutlined />
                                <YoutubeOutlined />
                                <LinkedinOutlined />
                                <TikTokOutlined />
                            </div>
                        </div>
                    </div>
                    <div className="footer-top-middle">
                        <div className="footer-section">
                            <div className="footer-section-1">
                                <div className="footer-links">
                                    <h4>Về TopCV</h4>
                                    <ul>
                                        <li>Giới thiệu</li>
                                        <li>Góc báo chí</li>
                                        <li>Tuyển dụng</li>
                                        <li>Liên hệ</li>
                                        <li>Hỏi đáp</li>
                                        <li>Chính sách bảo mật</li>
                                        <li>Điều khoản dịch vụ</li>
                                        <li>Quy chế hoạt động</li>
                                    </ul>
                                </div>
                                <div className="footer-links">
                                    <h4>Đối tác</h4>
                                    <ul>
                                        <li>TestCenter</li>
                                        <li>TopHR</li>
                                        <li>ViecNgay</li>
                                        <li>Happy Time</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-section-1">
                                <div className="footer-links">
                                    <h4>Hồ sơ và CV</h4>
                                    <ul>
                                        <li>Quản lý CV của bạn</li>
                                        <li>TopCV Profile</li>
                                        <li>Hướng dẫn viết CV</li>
                                        <li>Thư viện CV theo ngành nghề</li>
                                        <li>Review CV</li>
                                    </ul>
                                </div>
                                <div className="footer-links">
                                    <h4>Khám phá</h4>
                                    <ul>
                                        <li>Ứng dụng di động TopCV</li>
                                        <li>Tính lương Gross - Net</li>
                                        <li>Tính lãi suất kép</li>
                                        <li>Lập kế hoạch tiết kiệm</li>
                                        <li>Tính bảo hiểm thất nghiệp</li>
                                        <li>Tính bảo hiểm xã hội một lần</li>
                                        <li>Trắc nghiệm MBTI</li>
                                        <li>Trắc nghiệm MI</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-section-1">
                                <div className="footer-links">
                                    <h4>Xây dựng sự nghiệp</h4>
                                    <ul>
                                        <li>Việc làm tốt nhất</li>
                                        <li>Việc làm lương cao</li>
                                        <li>Việc làm quản lý</li>
                                        <li>Việc làm IT</li>
                                        <li>Việc làm Senior</li>
                                        <li>Việc làm bán thời gian</li>
                                    </ul>
                                </div>
                                <div className="footer-links">
                                    <h4>Phát triển bản thân</h4>
                                    <ul>
                                        <li>TopCV Contest</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-top">
                        <div className='footer-content'>
                            <h1 className="footer-title">Công ty Cổ phần TopCV Việt Nam</h1>
                            <ul className="footer-info-list">
                                <div className='footer-license'>
                                    <li className="footer-license-item">
                                        <BiSolidFile className="footer-icon" />
                                        Giấy phép đăng ký kinh doanh số: <span>0107307178</span>
                                    </li>
                                    <li className="footer-license-item">
                                        <BiFile className="footer-icon" />
                                        Giấy phép hoạt động dịch vụ việc làm số: <span>18/SLĐTBXH-GP</span>
                                    </li>
                                </div>
                                <li>
                                    <BiSolidLocationPlus className="footer-icon" />
                                    Trụ sở HN: <span>Tòa FS - GoldSeason số 47 Nguyễn Tuân, P.Thanh Xuân Trung, Q.Thanh Xuân, Hà Nội</span>
                                </li>
                                <li>
                                    <BiSolidLocationPlus className="footer-icon" />
                                    Chi nhánh HCM: <span>Tòa nhà Dali, 24C Phan Đăng Lưu, P.6, Q.Bình Thạnh, TP HCM</span>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-qr">
                            <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/qr_code.png" alt="QR Code" className="footer-qr-image" />
                            <a href="https://topcv.com.vn" className="footer-link">topcv.com.vn</a>
                        </div>
                    </div>
                </div>
                <div className="footer-copy">
                    <h1 className="footer-copyright">© 2014-2024 TopCV Vietnam JSC. All rights reserved.</h1>
                </div>
            </footer>
        </div>
    )
}

export default Footer
