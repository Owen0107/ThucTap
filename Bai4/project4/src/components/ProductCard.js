import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-overlay">
          <Link to={`/products/${product.id}`} className="view-btn">
            Xem chi tiết
          </Link>
        </div>
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="rating-value">Rating: {product.rating}/5</span>
        </div>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className={`product-stock ${product.stock > 20 ? 'in-stock' : 'low-stock'}`}>
            {product.stock > 20 ? 'Còn hàng' : `Còn ${product.stock}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
