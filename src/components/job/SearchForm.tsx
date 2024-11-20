import React, { useState, useEffect } from 'react';
import { getAllCategory, getAllAddress } from '../utils/ApiFunctions';
import { MenuUnfoldOutlined, EnvironmentOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';

const SearchForm = () => {
    interface Category {
        id: number;
        categoryName: string;
    }

    interface Address {
        id: number;
        name: string;
    }

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search term:', searchTerm);
        console.log('Selected category:', selectedCategory);
        console.log('Selected address:', selectedAddress);
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

        fetchAddresses();
        fetchCategories();
    }, []);

    return (
        <div className='container'>
            <header className="job-detail-header">
                <div className="job-detail-row">
                    <div className="search-row">
                        <form className="filter-form" onSubmit={handleSearch}>
                            <div className="job-container">
                                <div className="custom-select-category">
                                    <div
                                        className="custom-select-box-category"
                                        onClick={() => setSelectedCategory(null)}
                                    >
                                        <MenuUnfoldOutlined style={{ marginRight: '8px' }} />
                                        {selectedCategory || "Danh mục Nghề"}
                                        <DownOutlined style={{ marginLeft: '8px' }} />
                                    </div>
                                    <div className="custom-select-options-category">
                                        {categories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="custom-select-option-category"
                                                onClick={() => setSelectedCategory(category.categoryName)}
                                            >
                                                {category.categoryName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="search-container">
                                    <SearchOutlined className="search-icon" />
                                    <input
                                        placeholder="Vị trí tuyển dụng"
                                        className="search-input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="vertical-line"></div>
                                <div className="custom-select-location">
                                    <div
                                        className="custom-select-box-location"
                                        onClick={() => setSelectedAddress(null)}
                                    >
                                        <EnvironmentOutlined style={{ marginRight: '8px' }} />
                                        {selectedAddress || "Địa điểm"}
                                        <DownOutlined style={{ marginLeft: '70px', color: 'lightgray' }} />
                                    </div>
                                    <div className="custom-select-options-location">
                                        {addresses.map((address) => (
                                            <div
                                                key={address.id}
                                                className="custom-select-option-location"
                                                onClick={() => setSelectedAddress(address.name)}
                                            >
                                                {address.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form className="button-form" onSubmit={handleSearch}>
                            <button type="submit" className="search-button">
                                Tìm kiếm
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default SearchForm;
