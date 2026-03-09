import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/useAuthStore'
import useUIStore from './store/useUIStore'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import EmployeeDetail from './pages/EmployeeDetail'
import Departments from './pages/Departments'
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/NotFound'

function App() {
  const { isAuthenticated, checkTokenExpiry, startTokenExpiryCheck } = useAuthStore()
  const { isDarkMode, setDarkMode } = useUIStore()

  useEffect(() => {
    const uiStorage = localStorage.getItem('ui-storage')
    if (uiStorage) {
      const { state } = JSON.parse(uiStorage)
      if (state?.isDarkMode) {
        setDarkMode(true)
      }
    }
  }, [setDarkMode])

  useEffect(() => {
    if (isAuthenticated) {
      checkTokenExpiry()
      startTokenExpiryCheck()
    }
  }, [isAuthenticated, checkTokenExpiry, startTokenExpiryCheck])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            borderRadius: '12px',
            border: isDarkMode ? '1px solid #374151' : '1px solid #ccfbf1',
          },
          success: {
            iconTheme: {
              primary: '#14b8a6',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route
            path="/departments"
            element={
              <ProtectedRoute requiredRole="admin">
                <Departments />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
