import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole && requiredRole === 'admin') {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute
