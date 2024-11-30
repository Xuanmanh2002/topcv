import React from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ImageSlider: React.FC = () => {
  const images = [
    'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/concentrix.jpg',
    'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/JOLLIBEE%20(2)%20(1)%20(1)%20(1)%20(1).png',
    'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/C%C3%B4ng%20ty%20C%E1%BB%95%20ph%E1%BA%A7n%20Gi%C3%A1o%20d%E1%BB%A5c%20B%E1%BA%A3o%20An%20(1).jpg',
    'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Banner%20C1%20(1)%20(1).png',
    'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/%C4%91%E1%BA%A5t%20xanh.jpg',
    'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Banner_Center%20(1).png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Hiển thị 3 slide
    slidesToScroll: 1, // Cuộn 1 slide mỗi lần
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />, // Nút điều hướng phải
    prevArrow: <SamplePrevArrow />, // Nút điều hướng trái
    responsive: [
      {
        breakpoint: 768, // Màn hình nhỏ hơn 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img src={image} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SamplePrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-arrow-left`}
      style={{ ...style }}
      onClick={onClick}
    >
    </div>
  );
};

const SampleNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-arrow-right`}
      style={{ ...style }}
      onClick={onClick}
    >
    </div>
  );
};

export default ImageSlider;
