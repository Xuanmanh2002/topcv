import React, { useState, useEffect } from 'react';
import { getAllCategory, getAllAddress } from '../utils/ApiFunctions';
import { MenuUnfoldOutlined, EnvironmentOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    interface Category {
        id: number;
        categoryName: string;
    }

    interface Address {
        id: string;
        name: string;
    }

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);  // Storing selected address ID
    const [selectedAddressName, setSelectedAddressName] = useState<string | null>(null); // New state to store address name

    const navigate = useNavigate();

    // This function is used to handle the search action
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Search Term:', searchTerm);
        console.log('Selected Category:', selectedCategory);
        console.log('Selected Address:', selectedAddressName);  // Use the name here

        if (selectedCategory && selectedAddressId) {
            navigate(`/tim-viec-lam/${selectedCategory}-tai/${selectedAddressId}`);
        } else if (selectedCategory) {
            navigate(`/tim-viec-lam/${selectedCategory}`);
        } else if (selectedAddressId) {
            navigate(`/tim-viec-lam-tai/${selectedAddressId}`);
        } else if (searchTerm) {
            navigate(`/tim-viec-lam-dua-vao/${searchTerm}`);
        } else {
            navigate('/tim-viec-lam-moi-nhat');
        }
    };

    useEffect(() => {
        const storedCategoryId = localStorage.getItem('selectedCategoryId');
        const storedAddressId = localStorage.getItem('selectedAddressId');

        if (storedCategoryId) {
            setSelectedCategory(storedCategoryId);
        }

        if (storedAddressId) {
            setSelectedAddressId(storedAddressId);
        }
    }, []);

    const handleAddressChange = (value: string) => {
        setSelectedAddressId(value);
        const address = addresses.find(address => address.id === value); // Find the address name
        setSelectedAddressName(address ? address.name : null); // Set the name of the selected address
    };

    const handleCategoryChange = (value: string) => {
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
                                                onClick={() => handleCategoryChange(category.categoryName)}
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
                                        onClick={() => setSelectedAddressId(null)}
                                    >
                                        <EnvironmentOutlined style={{ marginRight: '8px' }} />
                                        {selectedAddressName || "Địa điểm"}  {/* Show the name instead of ID */}
                                        <DownOutlined style={{ marginLeft: '70px', color: 'lightgray' }} />
                                    </div>
                                    <div className="custom-select-options-location">
                                        {addresses.map((address) => (
                                            <div
                                                key={address.id}
                                                className="custom-select-option-location"
                                                onClick={() => handleAddressChange(address.id)}
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
