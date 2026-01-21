import React, { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-text">OWENSHOP</span>
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Trang chủ
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Sản phẩm
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Giới thiệu
            </NavLink>
          </li>
          <li className="nav-item nav-auth">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">👤 {user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="login-link">
                Đăng nhập
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
