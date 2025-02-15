import React, { useState, useEffect } from 'react';
import { SearchOutlined, EnvironmentOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Select, Input, Button, Typography } from 'antd';
import { getAllJob, getAllAddress, getAllCategory } from '../utils/ApiFunctions';
import JobList from '../common/JobList';
import JobListLike from '../common/JobListLike';
import ListEmployer from '../employer/ListEmployer';
import Slider from '../common/Slider'
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Job {
    title: string;
    location: string;
    salary: string;
    company: string;
    logots: string;
}

interface Address {
    id: number;
    name: string;
}

interface Category {
    id: number;
    categoryName: string;
}

const Job = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCategoryId = localStorage.getItem('selectedCategoryId');
        const storedAddressId = localStorage.getItem('selectedAddressId');

        if (storedCategoryId) {
            setSelectedCategory(Number(storedCategoryId));
        }

        if (storedAddressId) {
            setSelectedAddressId(Number(storedAddressId));
        }
    }, []);

    const handleSearch = () => {
        console.log('Search Term:', searchTerm);
        console.log('Selected Category:', selectedCategory);
        console.log('Selected Address:', selectedAddressId);
        if (selectedCategory && selectedAddressId) {
            navigate(`/tim-viec-lam/${selectedCategory}-tai/${selectedAddressId}`);
        }
        else if (selectedCategory) {
            navigate(`/tim-viec-lam/${selectedCategory}`);
        }
        else if (selectedAddressId) {
            navigate(`/tim-viec-lam-tai/${selectedAddressId}`);
        }
        else if (searchTerm) {
            navigate(`/tim-viec-lam-dua-vao/${searchTerm}`);
        }
        else {
            navigate('/tim-viec-lam-moi-nhat');
        }
    };

    const handleAddressChange = (value: number) => {
        setSelectedAddressId(value);
    };

    const handleCategoryChange = (value: number) => {
        setSelectedCategory(value);
    };

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const fetchedAddresses = await getAllAddress();
                setAddresses(fetchedAddresses);
            } catch (error) {
                console.error("Failed to fetch addresses:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategory();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        const fetchJobs = async () => {
            try {
                const fetchedJobs = await getAllJob();
                setJobs(fetchedJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAddresses();
        fetchCategories();
        fetchJobs();
    }, []);

    return (
        <main className="container">
            <div className='main-form'>
                <div className="main-form-header">
                    <Title className='main-form-header-title' level={1}>
                        Tìm việc làm nhanh 24h, việc làm mới nhất toàn quốc.
                    </Title>
                    <Paragraph className='main-form-header-description'>
                        Tiếp cận <span className='main-form-header-description-number-hight-light'>40,000+</span> tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
                    </Paragraph>
                </div>

                <form className="main-form-search">
                    <div className="main-form-search-item">
                        <Input
                            className="main-form-search-item-form-Job"
                            placeholder="Vị trí tuyển dụng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="main-form-search-item-select">
                        <EnvironmentOutlined style={{ marginRight: 1 }} />
                        <Select
                            placeholder="Tất cả 63 tỉnh thành"
                            className="main-form-search-item-select-location"
                            onChange={(value) => handleAddressChange(Number(value))}
                        >
                            {addresses.map((address) => (
                                <Option key={address.id} value={address.id}>
                                    {address.name}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="main-form-search-item-select">
                        <AppstoreAddOutlined style={{ marginRight: 1 }} />
                        <Select
                            placeholder="Tất cả ngành nghề"
                            className="main-form-search-item-select-industry"
                            onChange={(value) => handleCategoryChange(Number(value))}
                        >
                            {categories.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.categoryName}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Button
                        type="primary"
                        className='main-form-search-button'
                        onClick={handleSearch}
                        icon={<SearchOutlined />}
                    >
                        Tìm kiếm
                    </Button>
                </form>

                <div className='main-form-job-list'>
                    <img src='https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Banner%201.png' />
                </div>
            </div>
            <JobList />
            <Slider />
            <JobListLike />
            <ListEmployer />
        </main>
    );
};

export default Job
