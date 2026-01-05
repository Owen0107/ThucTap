import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "iPhone 15 Pro Max",
      subtitle: "Titanium. Mạnh mẽ. Chuyên nghiệp.",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800"
    },
    {
      title: "MacBook Pro M3",
      subtitle: "Hiệu năng vượt trội. Sáng tạo không giới hạn.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
    },
    {
      title: "Galaxy S24 Ultra",
      subtitle: "Galaxy AI. Kỷ nguyên mới của di động.",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"
    }
  ];

  useEffect(() => {
    setFeaturedProducts(products.slice(0, 4));
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
            <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">Mua ngay</Link>
              <Link to="/about" className="btn btn-secondary">Tìm hiểu thêm</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} />
          </div>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <h3>Giao hàng miễn phí</h3>
              <p>Cho đơn hàng từ 500K</p>
            </div>
            <div className="feature-card">
              <h3>Đổi trả 30 ngày</h3>
              <p>Miễn phí đổi trả</p>
            </div>
            <div className="feature-card">
              <h3>Chính hãng 100%</h3>
              <p>Cam kết sản phẩm chính hãng</p>
            </div>
            <div className="feature-card">
              <h3>Hỗ trợ 24/7</h3>
              <p>Tư vấn mọi lúc</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sản phẩm nổi bật</h2>
            <Link to="/products" className="view-all">Xem tất cả →</Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-overlay">
                    <Link to={`/products/${product.id}`} className="view-btn">Xem chi tiết</Link>
                  </div>
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    {'⭐'.repeat(Math.floor(product.rating))}
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <span className="product-price">{formatPrice(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Đăng ký nhận ưu đãi</h2>
            <p>Nhận ngay voucher giảm 10% cho đơn hàng đầu tiên</p>
            <div className="cta-form">
              <input type="email" placeholder="Nhập email của bạn" className="cta-input" />
              <button className="btn btn-primary">Đăng ký</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
