import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Sử dụng useRef để tham chiếu đến input elements
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const formRef = useRef(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy đường dẫn redirect từ state hoặc mặc định về trang chủ
  const from = location.state?.from?.pathname || '/';

  // Sử dụng useCallback để tối ưu hóa hàm xử lý
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setError('');
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
    setError('');
  }, []);

  const validateForm = useCallback(() => {
    if (!email.trim()) {
      setError('Vui lòng nhập email');
      emailInputRef.current?.focus();
      return false;
    }
    
    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      emailInputRef.current?.focus();
      return false;
    }
    
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu');
      passwordInputRef.current?.focus();
      return false;
    }
    
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      passwordInputRef.current?.focus();
      return false;
    }
    
    return true;
  }, [email, password]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Giả lập delay khi gọi API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = login(email, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  }, [email, password, login, navigate, from, validateForm]);

  const handleFocusPassword = useCallback(() => {
    passwordInputRef.current?.focus();
  }, []);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Đăng nhập</h1>
            <p className="login-subtitle">Chào mừng bạn quay trở lại!</p>
          </div>
          
          <form ref={formRef} onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                className="form-input"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={(e) => e.key === 'Enter' && handleFocusPassword()}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input
                ref={passwordInputRef}
                type="password"
                id="password"
                className="form-input"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p className="demo-info">
              💡 <strong>Demo:</strong> Nhập bất kỳ email và mật khẩu (ít nhất 6 ký tự) để đăng nhập
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
