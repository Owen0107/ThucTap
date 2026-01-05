import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            OWENSHOP
          </h3>
          <p className="footer-desc">
            Cửa hàng công nghệ hàng đầu Việt Nam với sản phẩm chính hãng và dịch vụ tận tâm.
          </p>
        </div>
        <div className="footer-section">
          <h4>Liên kết</h4>
          <ul className="footer-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/about">Giới thiệu</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <ul className="footer-contact">
            <li>123 Nguyễn Huệ, Q.1, TP.HCM</li>
            <li>1900 1234</li>
            <li>info@owenshop.vn</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Theo dõi</h4>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Youtube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 OWENSHOP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
