import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdChevronRight } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import ListCategory from '../category/ListCategory';
import { getEmployerByRank, getAllCategory, getActiveJobsByEmployer } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

interface EmployerResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    telephone: string;
    addressId: string;
    companyName: string;
    avatar: string;
    rank: string;
    scale: string;
    fieldActivity: String;
}

interface Category {
    id: number;
    categoryName: string;
}

const ListEmployer = () => {
    const [employers, setEmployers] = useState<EmployerResponse[]>([]);
    const [filteredEmployers, setFilteredEmployers] = useState<EmployerResponse[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [categoryStartIndex, setCategoryStartIndex] = useState<number>(0);
    const itemsPerPage = 9;
    const itemsPerCategory = 5;
    const navigate = useNavigate();
    const [jobCounts, setJobCounts] = useState<{ [key: number]: number }>({});


    useEffect(() => {
        const fetchEmployersAndJobCounts = async () => {
            try {
                const employerData = await getEmployerByRank();
                setEmployers(employerData);
                setFilteredEmployers(employerData);
                const jobCountPromises = employerData.map(async (employer) => {
                    const count = await getActiveJobsByEmployer(employer.id);
                    return { adminId: employer.id, count };
                });
                const jobCountsData = await Promise.all(jobCountPromises);
                const jobCountsMap: { [key: number]: number } = {};
                jobCountsData.forEach(({ adminId, count }) => {
                    jobCountsMap[adminId] = count;
                });
                setJobCounts(jobCountsMap);
            } catch (error: any) {
                setError('Error fetching employers and job counts.');
                message.error('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
            const fetchCategories = async () => {
                try {
                    const data = await getAllCategory();
                    setCategories(data);
                } catch (error: any) {
                    setError('Error fetching categories.');
                    message.error('Failed to fetch categories.');
                }
            };
            fetchCategories();
        };

        fetchEmployersAndJobCounts();
    }, []);

    const handleSearch = (value: string) => {
        const filtered = employers.filter((employer) =>
            employer.companyName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEmployers(filtered);
    };

    const handleCompanyClick = async (companyName: string, email: string, employerId: number) => {
        localStorage.setItem('companyName', companyName);
        localStorage.setItem('email', email);
        console.log(companyName, email);

        try {
            const activeJobs = await getActiveJobsByEmployer(employerId);
            console.log("Active jobs:", activeJobs);
        } catch (error) {
            message.error('Failed to fetch active jobs.');
        }

        navigate(`/cong-ty/${companyName}`);
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if ((currentPage + 1) * itemsPerPage < filteredEmployers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousCategory = () => {
        if (categoryStartIndex > 0) {
            setCategoryStartIndex(categoryStartIndex - 1);
        }
    };

    const goToNextCategory = () => {
        if ((categoryStartIndex + 1) * itemsPerCategory < categories.length) {
            setCategoryStartIndex(categoryStartIndex + 1);
        }
    };

    return (
        <div className='wrapper'>
            <div className='list-box-company-container'>
                <div className='list-employer-header'>
                    <div className='list-employer-cover'>
                        <div className='list-employer-box'>
                            <h2 className='list-employer-title'>
                                Thương hiệu lớn tiêu biểu
                                <span className="list-company-pro">Pro Company</span>
                            </h2>
                            <div className='list-employer-decribe'>
                                "Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường"
                            </div>
                            <div className='list-category-employer'>
                                <div className='list-category-icon'>
                                    <MdKeyboardArrowLeft className='list-category-icon-left' onClick={goToPreviousCategory} />
                                </div>
                                <div className='list-box-field-category'>
                                    <div className='list-box-field-category-item-active'> Tất cả </div>
                                    {categories.slice(categoryStartIndex * itemsPerCategory, (categoryStartIndex + 1) * itemsPerCategory).map((category) => (
                                        <div key={category.id} className='list-box-field-category-item'>
                                            {category.categoryName}
                                        </div>
                                    ))}
                                </div>
                                <div className='list-category-icon'>
                                    <MdChevronRight className='list-category-icon-right' onClick={goToNextCategory} />
                                </div>
                            </div>
                        </div>
                        <div className='list-box-company-pro'>
                            <div className='list-box-field'>
                                <div className='list-box-category-icon'>
                                    <MdKeyboardArrowLeft className='list-box-category-icon-left' />
                                </div>
                                <div className='list-box-field-category'>
                                    <div className='list-box-field-category-item-active'> Tất cả </div>
                                    {categories.map((category) => (
                                        <div key={category.id} className='list-box-field-category-item'>
                                            {category.categoryName}
                                        </div>
                                    ))}
                                </div>
                                <div className='list-box-category-icon-next'>
                                    <MdChevronRight className='list-box-category-icon-right' />
                                </div>
                            </div>
                            <div className='list-box-company'>
                                <div className='list-box-company-btn'>
                                    <MdKeyboardArrowLeft className='list-box-company-btn-left' onClick={goToPreviousPage} />
                                </div>
                                <div className='wrapper-list-company'>
                                    <div className='list-box-company-all'>
                                        <div className='slick-list-draggable'>
                                            <div className='slick-track-company'>
                                                <div className='page-company-pro-active' data-slick-index="0" aria-hidden="false" tabIndex={0}>
                                                    {filteredEmployers
                                                        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                                        .map((employer) => (
                                                            <a
                                                                key={employer.id}
                                                                className='list-box-company-item'
                                                                onClick={() => handleCompanyClick(employer.companyName, employer.email, employer.id)} 
                                                                target='_blank'
                                                                tabIndex={0}
                                                            >
                                                                <div className='list-box-company-header'>
                                                                    <div className='list-box-company-img'>
                                                                        <img src={employer.avatar ? `data:image/png;base64,${employer.avatar}` : '/default-avatar.png'} alt={employer.companyName} />
                                                                    </div>
                                                                    <div className='list-box-company-desc'>
                                                                        <div className='list-box-company-desc-name'>{employer.companyName}</div>
                                                                        <div className='list-box-company-desc-field'>{employer.fieldActivity}</div>
                                                                    </div>
                                                                    <div className='list-box-company-desc-icon'>
                                                                        <FaBriefcase className='list-box-company-desc-icon-case' />
                                                                        <span>{jobCounts[employer.id] || 0} việc làm</span>
                                                                    </div>
                                                                </div>
                                                                <div className='job--company-list'>
                                                                    <FaBriefcase className='list-box-company-desc-icon-case' />
                                                                    <span>{jobCounts[employer.id] || 0} việc làm</span>
                                                                </div>
                                                            </a>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='list-box-company-btn-next'>
                                    <MdChevronRight className='list-box-company-btn-left' onClick={goToNextPage} />
                                </div>
                            </div>
                        </div>
                        <div className='go-to-landing'>
                            <a className='go-to-landing-button'>
                                <span className='go-to-landing-button-title'>Tìm hiểu thêm về TopCV</span>
                                <div className='job-pro-wrap-employer'>
                                    <span>Pro</span>
                                </div>
                                <FaArrowRight />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ListCategory />
        </div>
    );
};

export default ListEmployer;
