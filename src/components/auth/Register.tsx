import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, Upload, notification } from 'antd';
import { MailOutlined, UserOutlined, PhoneOutlined, HomeOutlined, IdcardOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, LinkedinOutlined, UploadOutlined } from '@ant-design/icons';
import SidebarAuth from '../layout/Sidebar';
import { useNavigate } from "react-router-dom";
import { registerCustomer, getAllAddress } from '../utils/ApiFunctions';
import moment from 'moment';

const { Option } = Select;

const Register: React.FC = () => {
    const [addresses, setAddresses] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const allAddresses = await getAllAddress();
                setAddresses(allAddresses);
            } catch (error) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể lấy danh sách địa chỉ. Vui lòng thử lại sau.',
                });
            }
        };

        fetchAddresses();
    }, []);

    const handleRegistration = async (values: any) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                let value = values[key];

                if (key === "birthDate") {
                    value = moment(value).format("YYYY-MM-DD");
                }

                if (key === "avatar" && value?.file) {
                    formData.append("avatar", value.file);
                } else {
                    formData.append(key, String(value));
                }
            });

            await registerCustomer(formData);
            notification.success({
                message: 'Đăng ký thành công!',
                description: 'Bạn đã đăng ký thành công. Vui lòng đăng nhập.',
            });
            navigate("/login");
        } catch (error: any) {
            notification.error({
                message: 'Lỗi đăng ký',
                description: `Đã xảy ra lỗi trong quá trình đăng ký: ${error.message}`,
            });
        }
    };

    return (
        <div className="container-login">
            <div className="login-wrapper">
                <div className="login-content">
                    <h2 className="login-title">Chào mừng bạn đã quay trở lại</h2>
                    <p>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>
                    <Form
                        name="register-form"
                        layout="vertical"
                        className="login-form"
                        onFinish={handleRegistration}
                    >
                        <label>Họ</label>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ của bạn!' }]}
                        >
                            <Input prefix={<UserOutlined style={{ color: '#00b14f' }} />} placeholder="Họ" />
                        </Form.Item>
                        <label>Tên</label>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                        >
                            <Input prefix={<UserOutlined style={{ color: '#00b14f' }} />} placeholder="Tên" />
                        </Form.Item>
                        <label>Ngày tháng năm sinh</label>
                        <Form.Item
                            name="birthDate"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày tháng năm sinh của bạn!' }]}
                        >
                            <Input prefix={<IdcardOutlined style={{ color: '#00b14f' }} />} type="date" />
                        </Form.Item>
                        <label>Giới tính</label>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính của bạn!' }]}
                        >
                            <Select placeholder="Chọn giới tính">
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">Giới tính khác</Option>
                            </Select>
                        </Form.Item>
                        <label>Hình đại diện</label>
                        <Form.Item
                            name="avatar"
                            rules={[{ required: true, message: 'Vui lòng chọn hình đại diện của bạn!' }]}
                            valuePropName="file"
                        >
                            <Upload
                                beforeUpload={() => false}
                                maxCount={1}
                                listType="picture"
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
                            </Upload>
                        </Form.Item>
                        <label>Số điện thoại</label>
                        <Form.Item
                            name="telephone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
                        >
                            <Input prefix={<PhoneOutlined style={{ color: '#00b14f' }} />} placeholder="Số điện thoại" />
                        </Form.Item>
                        <label>Địa chỉ</label>
                        <Form.Item
                            name="addressId"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn!' }]}
                        >
                            <Select placeholder="Chọn địa chỉ">
                                {addresses.map((address) => (
                                    <Option key={address.id} value={address.id}>
                                        {address.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <label>Email</label>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                        >
                            <Input prefix={<MailOutlined style={{ color: '#00b14f' }} />} placeholder="Email" />
                        </Form.Item>
                        <label>Mật khẩu</label>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: '#00b14f' }} />} placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-button">
                                Đăng ký
                            </Button>
                        </Form.Item>
                        <div className="login-social-text">Hoặc đăng nhập bằng</div>
                        <div className='login-social-icon'>
                            <Form.Item>
                                <Button icon={<GoogleOutlined />} className="social-button google">
                                    Google
                                </Button>
                                <Button icon={<FacebookOutlined />} className="social-button facebook">
                                    Facebook
                                </Button>
                                <Button icon={<LinkedinOutlined />} className="social-button linkedin">
                                    LinkedIn
                                </Button>
                            </Form.Item>
                        </div>
                        <Form.Item name="agreement" valuePropName="checked">
                            <Checkbox>
                                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với{' '}
                                <a style={{ color: '#00b14f' }} href="#">Điều khoản dịch vụ</a> và <a style={{ color: '#00b14f' }} href="#">Chính sách bảo mật của TopCV</a>
                            </Checkbox>
                        </Form.Item>
                        <div className="agreement">
                            Bạn đã có tài khoản? <a style={{ color: '#00b14f' }} href="/dang-nhap">Đăng nhập ngay</a>
                        </div>
                        <div className="contact-info">
                            <p style={{ fontWeight: 'bold' }}>Bạn gặp khó khăn khi tạo tài khoản?</p>
                            <p>Vui lòng gọi tới số <strong style={{ color: '#00b14f' }}>(024) 6680 5588</strong> (giờ hành chính).</p>
                        </div>
                    </Form>
                </div>
            </div>
            <SidebarAuth />
        </div>
    );
};

export default Register;
