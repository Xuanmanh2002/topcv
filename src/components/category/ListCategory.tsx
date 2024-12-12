import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdChevronRight } from "react-icons/md";
import SliderEmployer from '../employer/SliderEmployer';
import { getActiveJobsByCategory, getAllCategory } from '../utils/ApiFunctions';

interface Category {
    id: number;
    categoryName: string;
    images: string;
}

const ListCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 8;
    const [jobCounts, setJobCounts] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategory();
                setCategories(fetchedCategories);
                const jobCountPromises = fetchedCategories.map(async (category) => {
                    const count = await getActiveJobsByCategory(category.id);
                    return { categoryId: category.id, count };
                });
                const jobCountsData = await Promise.all(jobCountPromises);
                const jobCountsMap: { [key: number]: number } = {};
                jobCountsData.forEach(({ categoryId, count }) => {
                    jobCountsMap[categoryId] = count;
                });
                setJobCounts(jobCountsMap);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

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
                                        {currentCategories.length === 0 ? (
                                            <p>Loading categories...</p>
                                        ) : (
                                            currentCategories.map(category => (
                                                <div className='category-col-md-3' key={category.id}>
                                                    <div className='top-category-item'>
                                                        <div className='top-category-image'>
                                                            <a target='_blank'>
                                                                <img src={category.images ? `data:image/png;base64,${category.images}` : '/default-avatar.png'} className='category-img-item' alt={category.categoryName} />
                                                            </a>
                                                        </div>
                                                        <h3 className='top-category-name'>
                                                            <a>{category.categoryName}</a>
                                                        </h3>
                                                        <p className='top-category-caption'>{jobCounts[category.id] || 0} việc làm</p>
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
}

export default ListCategory;
