import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import SidebarAuth from '../layout/Sidebar';
import { loginCustomer } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const openNotification = (type: 'success' | 'error', message: string, description: string) => {
        notification[type]({
            message,
            description,
        });
    };

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const customerData = await loginCustomer(values);
            if (customerData) {
                openNotification('success', 'Đăng nhập thành công!', 'Bạn đã đăng nhập thành công');
                navigate('/');
            } else {
                openNotification('error', 'Đăng nhập thất bại', 'Vui lòng kiểm tra thông tin đăng nhập và thử lại.');
            }
        } catch (error) {
            openNotification('error', 'Lỗi hệ thống', 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="container-login">
            <div className="login-wrapper">
                <div className="login-content">
                    <h2 className="login-title">Chào mừng bạn đã quay trở lại</h2>
                    <p>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>
                    <Form
                        name="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                        >
                            <Input
                                prefix={<MailOutlined style={{ color: '#00b14f' }} />}
                                placeholder="Email"
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#00b14f' }} />}
                                placeholder="Mật khẩu"
                            />
                        </Form.Item>
                        <Form.Item className="login-forgot">
                            <a style={{ color: '#00b14f' }} href="#">Quên mật khẩu</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button">
                                Đăng nhập
                            </Button>
                        </Form.Item>
                        <div className="login-social-text">Hoặc đăng nhập bằng</div>
                        <div className="login-social-icon">
                            <Form.Item>
                                <Button icon={<GoogleOutlined />} className="social-button google">Google</Button>
                                <Button icon={<FacebookOutlined />} className="social-button facebook">Facebook</Button>
                                <Button icon={<LinkedinOutlined />} className="social-button linkedin">LinkedIn</Button>
                            </Form.Item>
                        </div>
                        <Form.Item name="agreement" valuePropName="checked">
                            <Checkbox>
                                Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với{' '}
                                <a style={{ color: '#00b14f' }} href="#">Điều khoản dịch vụ</a> và <a style={{ color: '#00b14f' }} href="#">Chính sách bảo mật của TopCV</a>
                            </Checkbox>
                        </Form.Item>
                        <div className="agreement">
                            Bạn chưa có tài khoản? <a style={{ color: '#00b14f' }} href="/dang-ky">Đăng ký ngay</a>
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

export default Login;
