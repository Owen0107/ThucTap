import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useUIStore from '../store/useUIStore'
import useAuthStore from '../store/useAuthStore'
import { formatCurrency } from '../utils/formatters'

const EmployeeCard = ({ employee, onEdit, onDelete, index = 0 }) => {
  const { isDarkMode } = useUIStore()
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800/80 border border-gray-700' 
          : 'bg-white/80 border border-mint-100'
      } backdrop-blur-sm shadow-sm hover:shadow-lg transition-all`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      layout
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <motion.img
            src={employee.avatar}
            alt={employee.name}
            className="w-16 h-16 rounded-full border-2 border-mint-400"
            whileHover={{ scale: 1.1 }}
          />
          <div className="flex-1 min-w-0">
            <Link to={`/employees/${employee.id}`}>
              <h3 className={`text-lg font-bold truncate hover:text-mint-500 transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {employee.name}
              </h3>
            </Link>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {employee.position}
            </p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
              employee.status === 'active'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {employee.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Department
            </span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {employee.department}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Salary
            </span>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-mint-400' : 'text-mint-600'}`}>
              {formatCurrency(employee.salary)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Email
            </span>
            <span className={`text-sm truncate max-w-[150px] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {employee.email}
            </span>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-4 pt-4 border-t border-mint-100 dark:border-gray-700 flex gap-2">
            <motion.button
              onClick={() => onEdit(employee)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-mint-600/20 text-mint-400 hover:bg-mint-600/30' 
                  : 'bg-mint-100 text-mint-700 hover:bg-mint-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Edit
            </motion.button>
            <motion.button
              onClick={() => onDelete(employee)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Delete
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default EmployeeCard
