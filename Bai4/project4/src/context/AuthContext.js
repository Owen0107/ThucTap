import React, { createContext, useState, useContext, useCallback } from 'react';

// Tạo AuthContext
const AuthContext = createContext(null);

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Kiểm tra localStorage khi khởi tạo
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Sử dụng useCallback để tối ưu hóa performance
  const login = useCallback((email, password) => {
    // Demo: chấp nhận bất kỳ email/password nào
    // Trong thực tế sẽ gọi API để xác thực
    if (email && password) {
      const userData = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        role: 'user'
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true };
    }
    return { success: false, error: 'Email hoặc mật khẩu không hợp lệ' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
