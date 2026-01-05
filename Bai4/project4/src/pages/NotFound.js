import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-animation">
          <span className="error-code">4</span>
          <span className="error-code">0</span>
          <span className="error-code">4</span>
        </div>
        <h1 className="not-found-title">Oops! Trang không tồn tại</h1>
        <p className="not-found-text">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Về trang chủ
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Xem sản phẩm
          </Link>
        </div>
        <div className="not-found-suggestions">
          <p>Bạn có thể thử:</p>
          <ul>
            <li>Kiểm tra lại đường dẫn URL</li>
            <li>Quay lại trang trước đó</li>
            <li>Liên hệ với chúng tôi nếu cần hỗ trợ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
