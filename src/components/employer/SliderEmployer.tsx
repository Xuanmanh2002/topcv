import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { FaRegGem } from 'react-icons/fa';
import { getEmployerByRank } from '../utils/ApiFunctions';
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

const SliderEmployer = () => {
    const [employers, setEmployers] = useState<EmployerResponse[]>([]);
    const [filteredEmployers, setFilteredEmployers] = useState<EmployerResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const data = await getEmployerByRank();
                setEmployers(data);
                setFilteredEmployers(data);
            } catch (error: any) {
                setError('Error fetching employers by rank.');
                message.error('Failed to fetch employers.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployers();
    }, []);
    const handleCompanyClick = (companyName: string, email: string) => {
        localStorage.setItem('companyName', companyName);
        localStorage.setItem('email', email);
        console.log(companyName, email);
        navigate(`/cong-ty/${companyName}`);
    };

    return (
        <div className="slider-employer-container">
            <div className="diamond-employer-header">
                <h2 className="diamond-employer-title">Nhà tuyển dụng nổi bật</h2>
            </div>
            <Carousel
                autoplay
                dots={false}
                slidesToShow={5}
                responsive={[
                    {
                        breakpoint: 1140,
                        settings: { slidesToShow: 3 },
                    },
                    {
                        breakpoint: 768,
                        settings: { slidesToShow: 2 },
                    },
                    {
                        breakpoint: 480,
                        settings: { slidesToShow: 1 },
                    },
                ]}
            >
                {filteredEmployers
                    .map((employer) => (
                        <div key={employer.id} className="diamond-employer-item" >
                            <a className="diamond-employer-banner" onClick={() => handleCompanyClick(employer.companyName, employer.email)}>
                                <span className="diamond-employer-icon">
                                    <FaRegGem className="diamond-employer-icon-diamond" />
                                    Top
                                </span>
                                <img 
                                    className="diamond-employer-img"
                                    src={employer.avatar ? `data:image/png;base64,${employer.avatar}` : '/default-avatar.png'}
                                    alt={employer.companyName}
                                />
                            </a>
                        </div>
                    ))}
            </Carousel>
        </div>
    );
};

export default SliderEmployer;
