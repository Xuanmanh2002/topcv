import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import SliderEmployer from '../employer/SliderEmployer';
import { getActiveJobsByCategory, getCategoriesWithJobs } from '../utils/ApiFunctions';

interface Category {
    id: number;
    categoryName: string;
    description: string;
    createAt: string;
    images: string | null;
}

const ListCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 8;
    const [jobCounts, setJobCounts] = useState<{ [key: number]: number }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchCategoriesAndJobs = async () => {
            try {
                setLoading(true);
                setError(null);

                const fetchedCategories = await getCategoriesWithJobs();
                setCategories(fetchedCategories);

                const jobCountsMap = await fetchJobCounts(fetchedCategories);
                setJobCounts(jobCountsMap);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setError("Không thể tải danh sách ngành nghề.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndJobs();
    }, []);

    const fetchJobCounts = async (categories: Category[]) => {
        const jobCountPromises = categories.map(async (category) => {
            try {
                const count = await getActiveJobsByCategory(category.id);
                return { [category.id]: count };
            } catch {
                return { [category.id]: 0 };
            }
        });

        const jobCountsArray = await Promise.all(jobCountPromises);
        return Object.assign({}, ...jobCountsArray);
    };

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const nextPage = () => {
        if (currentPage * categoriesPerPage < categories.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCategoryClick = (categoryId: number) => {
        navigate(`/tim-viec-lam/${categoryId}`); // Redirect to the specific category's job page
    };

    return (
        <div className='top-category'>
            <div className='category-container'>
                <div className='top-category-header'>
                    <div className='top-category-box-title'>
                        <h2 className='top-category-title'>Top ngành nghề nổi bật</h2>
                        <p>
                            Bạn muốn tìm việc mới? Xem danh sách việc làm
                            <a target='_blank' className='text-hightlight-category'> tại đây</a>
                        </p>
                    </div>
                    <div className='top-category-navigation'>
                        <button
                            aria-label='chevron-left'
                            title='chevron-left'
                            className='btn-navigation-category-left'
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        >
                            <MdKeyboardArrowLeft className='category-btn-left' />
                        </button>
                        <button
                            aria-label='chevron-right'
                            title='chevron-right'
                            className='btn-navigation-category-right'
                            onClick={nextPage}
                            disabled={currentPage * categoriesPerPage >= categories.length}
                        >
                            <MdChevronRight className='category-btn-right' />
                        </button>
                    </div>
                </div>
                <div className='top-category-body'>
                    <div className='top-category-body-list'>
                        <div className='owl-stage-outer'>
                            <div className='owl-stage'>
                                <div className='category-owl'>
                                    <div className='category-row-mx2'>
                                        {loading ? (
                                            <p>Loading categories...</p>
                                        ) : error ? (
                                            <p>{error}</p>
                                        ) : currentCategories.length === 0 ? (
                                            <p>Không có ngành nghề nào.</p>
                                        ) : (
                                            currentCategories.map(category => (
                                                <div className='category-col-md-3' key={category.id}>
                                                    <div
                                                        className='top-category-item'
                                                        onClick={() => handleCategoryClick(category.id)} // Add onClick handler
                                                    >
                                                        <div className='top-category-image'>
                                                            <a>
                                                                <img
                                                                    src={category.images || '/default-avatar.png'}
                                                                    className='category-img-item'
                                                                    alt={category.categoryName}
                                                                />
                                                            </a>
                                                        </div>
                                                        <h3 className='top-category-name'>
                                                            <a>{category.categoryName}</a>
                                                        </h3>
                                                        <p className='top-category-caption'>
                                                            {jobCounts[category.id] || 0} việc làm
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SliderEmployer />
        </div>
    );
};

export default ListCategory;
