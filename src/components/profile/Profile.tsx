import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Typography, Space, Switch, notification } from 'antd';
import bannerApp from "../../assets/img/banner--app.webp";
import banner_magger from '../../assets/img/bg_banner_horoscope_magager_cv.webp'
import { CiCamera } from "react-icons/ci";
import { MdUpgrade, MdOutlineReportGmailerrorred } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { getCustomerById, updateCustomerProfile, getAllAddress, checkRoleCustomer } from '../utils/ApiFunctions';
const { Title, Text } = Typography;
const { Option } = Select;
import moment from 'moment';
import { useNavigate } from "react-router-dom";

interface Customer {
    firstName: string;
    lastName: string;
    avatar: string | null;
    email: string;
    birthDate: Date;
    gender: string;
    telephone: string;
    addressId: string;
}

interface Address {
    id: string;
    name: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const [isJobSearching, setIsJobSearching] = useState(false);
    const [isProfileSearchable, setIsProfileSearchable] = useState(true);
    const [customer, setCustomer] = useState<Customer>({
        firstName: "",
        lastName: "",
        avatar: null,
        email: "",
        birthDate: new Date(),
        gender: "",
        telephone: "",
        addressId: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleJobSearchToggle = (checked: boolean) => {
        setIsJobSearching(checked);
    };

    const handleProfileSearchableToggle = (checked: boolean) => {
        setIsProfileSearchable(checked);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/dang-nhap"); 
            return;
        }

        const validateRole = async () => {
            const hasRoleCustomer = await checkRoleCustomer(token);
            if (!hasRoleCustomer) {
                navigate("/dang-nhap"); 
                return;
            }

            try {
                const customerData = await getCustomerById();
                setCustomer({
                    ...customerData,
                    birthDate: customerData.birthDate ? new Date(customerData.birthDate) : null,
                });
            } catch (error) {
                console.error("Error fetching customer data", error);
            }

            try {
                const addressList = await getAllAddress();
                setAddresses(addressList);
            } catch (error) {
                console.error("Error fetching address data", error);
            }
        };

        validateRole();
    }, [navigate]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64 = reader.result as string;
                setCustomer(prev => ({ ...prev, avatar: base64 }));
                setAvatar(file);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const updatedCustomer = await updateCustomerProfile(
                customer.email,
                customer.firstName,
                customer.lastName,
                customer.birthDate ? customer.birthDate.getTime() : 0,
                customer.gender,
                customer.telephone,
                Number(customer.addressId),
                avatar
            );
            setCustomer(updatedCustomer);
            console.log("Profile updated successfully:", updatedCustomer);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    return (
        <div className="cv-manager-container">
            <div className="cv-manager-header">
                <div className="cv-section">
                    <div className="cv-card">
                        <div className="profile-card-header">
                            <Title level={4}>Cài đặt thông tin cá nhân</Title>
                            <Text className='required'>
                                <span className='require_hight-light'>(*) </span>Các thông tin bắt buộc
                            </Text>
                            <Form
                                layout="vertical"
                                onFinish={handleSubmit}
                                className="profile-form"
                                initialValues={{
                                    email: customer.email,
                                    firstName: customer.firstName,
                                    lastName: customer.lastName,
                                    birthDate: customer.birthDate ? moment(customer.birthDate) : null,
                                    gender: customer.gender,
                                    telephone: customer.telephone,
                                    addressId: customer.addressId,
                                }}
                            >
                                <Space direction="vertical" style={{ width: '100%', paddingTop: "20px" }} >
                                    <Form.Item
                                        label="Email"
                                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                                    >
                                        <Input placeholder="Nhập email" value={customer.email} />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        label="Họ"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                                    >
                                        <Input placeholder="Nhập họ" value={customer.firstName} onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Tên"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                    >
                                        <Input placeholder="Nhập tên" value={customer.lastName} onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Ngày sinh"
                                        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                                    >
                                        <DatePicker
                                            format="DD-MM-YYYY"
                                            value={customer.birthDate ? moment(customer.birthDate) : null}
                                            onChange={(date) => {
                                                setCustomer({ ...customer, birthDate: date ? date.toDate() : new Date() });
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Giới tính"
                                        rules={[{ required: true, message: 'Vui lòng chọn giới tính của bạn!' }]}
                                    >
                                        <Select defaultValue="Chọn giới tính" value={customer.gender}>
                                            <Option value="male">Nam</Option>
                                            <Option value="female">Nữ</Option>
                                            <Option value="other">Giới tính khác</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Số điện thoại"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                    >
                                        <Input
                                            placeholder="Số điện thoại"
                                            value={customer.telephone}
                                            onChange={(e) => setCustomer({ ...customer, telephone: e.target.value })}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}
                                    >
                                        <Select value={customer.addressId} placeholder="Chọn địa chỉ" >
                                            {addresses.map((address) => (
                                                <Option key={address.id} value={address.id}>
                                                    {address.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block>
                                            Lưu
                                        </Button>
                                    </Form.Item>
                                </Space>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <div className='profile-card'>
                        <div className="profile-card-customer">
                            <div className="avatar-container">
                                <div className="avatar-container">
                                    <img
                                        alt="Avatar"
                                        src={
                                            customer.avatar
                                                ? `data:image/jpeg;base64,${customer.avatar}`
                                                : "/path/to/default-image.jpg"
                                        }
                                        className="avatar-img"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="avatar-input"
                                        style={{ display: "none" }}
                                    />
                                    <CiCamera
                                        className="camera-icon"
                                        onClick={() => {
                                            const fileInput = document.querySelector(".avatar-input") as HTMLInputElement;
                                            if (fileInput) {
                                                fileInput.click();
                                            }
                                        }}
                                    />
                                </div>
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

export default Profile
