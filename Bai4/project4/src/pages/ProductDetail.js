import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import products from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        const related = products.filter(
          p => p.category === foundProduct.category && p.id !== foundProduct.id
        ).slice(0, 4);
        setRelatedProducts(related);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Sản phẩm không tồn tại</h2>
        <p>Sản phẩm bạn đang tìm không có trong hệ thống.</p>
        <Link to="/products" className="btn btn-primary">Quay lại cửa hàng</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/products">Sản phẩm</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            <span className="detail-category">{product.category}</span>
          </div>

          <div className="product-detail-info">
            <h1 className="detail-name">{product.name}</h1>
            
            <div className="detail-rating">
              {'⭐'.repeat(Math.floor(product.rating))}
              <span className="rating-text">{product.rating} / 5.0</span>
              <span className="reviews">(128 đánh giá)</span>
            </div>

            <div className="detail-price">{formatPrice(product.price)}</div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-stock">
              <span className={product.stock > 20 ? 'in-stock' : 'low-stock'}>
                {product.stock > 20 ? '✓ Còn hàng' : `⚠ Chỉ còn ${product.stock} sản phẩm`}
              </span>
            </div>

            <div className="quantity-selector">
              <label>Số lượng:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >−</button>
                <span className="qty-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="qty-btn"
                >+</button>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn btn-primary btn-large">
                🛒 Thêm vào giỏ hàng
              </button>
              <button className="btn btn-secondary btn-large">
                ❤️ Yêu thích
              </button>
            </div>

            <div className="detail-features">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <span>Giao hàng miễn phí toàn quốc</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔄</span>
                <span>Đổi trả trong 30 ngày</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span>Bảo hành chính hãng 12 tháng</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="section-title">Sản phẩm liên quan</h2>
            <div className="products-grid">
              {relatedProducts.map((item, index) => (
                <div 
                  key={item.id} 
                  className="product-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <div className="product-image-wrapper">
                    <img src={item.image} alt={item.name} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <span className="product-price">{formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
