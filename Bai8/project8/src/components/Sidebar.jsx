import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useUIStore from '../store/useUIStore'
import useAuthStore from '../store/useAuthStore'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', roles: ['admin', 'user'] },
  { path: '/employees', label: 'Employees', roles: ['admin', 'user'] },
  { path: '/departments', label: 'Departments', roles: ['admin'] },
]

const Sidebar = () => {
  const { isDarkMode, sidebarOpen } = useUIStore()
  const { user } = useAuthStore()

  const filteredNavItems = navItems.filter(
    (item) => item.roles.includes(user?.role || 'user')
  )

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          className={`w-64 min-h-[calc(100vh-64px)] border-r ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/60 border-mint-100'
          } backdrop-blur-sm`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="p-4 space-y-2">
            {filteredNavItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? isDarkMode
                          ? 'bg-mint-600 text-white shadow-lg shadow-mint-600/20'
                          : 'bg-mint-500 text-white shadow-lg shadow-mint-500/30'
                        : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                        : 'text-gray-600 hover:bg-mint-50 hover:text-mint-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-mint-50'
          }`}>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Logged in as
            </p>
            <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {user?.email}
            </p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
              user?.role === 'admin'
                ? 'bg-mint-500 text-white'
                : isDarkMode
                ? 'bg-gray-600 text-gray-200'
                : 'bg-mint-200 text-mint-800'
            }`}>
              {user?.role === 'admin' ? 'Admin' : 'User'}
            </span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
