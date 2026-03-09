import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import useUIStore from '../store/useUIStore'
import useAuthStore from '../store/useAuthStore'
import useEmployeeStore from '../store/useEmployeeStore'
import Modal from '../components/Modal'
import EmployeeForm from '../components/EmployeeForm'
import ConfirmDialog from '../components/ConfirmDialog'
import { SkeletonDetail } from '../components/Skeleton'
import { formatCurrency, formatDate } from '../utils/formatters'

const EmployeeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDarkMode } = useUIStore()
  const { user } = useAuthStore()
  const { selectedEmployee, isLoading, fetchEmployeeById, updateEmployee, deleteEmployee } = useEmployeeStore()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    if (id) {
      fetchEmployeeById(parseInt(id))
    }
  }, [id, fetchEmployeeById])

  const handleUpdate = async (data) => {
    const result = await updateEmployee(selectedEmployee.id, {
      ...selectedEmployee,
      ...data,
    })
    if (result.success) {
      toast.success('Employee updated successfully')
      setIsEditModalOpen(false)
    } else {
      toast.error(result.message)
    }
  }

  const handleDelete = async () => {
    const result = await deleteEmployee(selectedEmployee.id)
    if (result.success) {
      toast.success('Employee deleted successfully')
      navigate('/employees')
    } else {
      toast.error(result.message)
    }
    setIsConfirmOpen(false)
  }

  if (isLoading || !selectedEmployee) {
    return <SkeletonDetail />
  }

  return (
    <div className="space-y-6">
      <motion.button
        onClick={() => navigate('/employees')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isDarkMode 
            ? 'text-gray-300 hover:bg-gray-800' 
            : 'text-gray-600 hover:bg-mint-100'
        }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -4 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Employees
      </motion.button>

      <motion.div
        className={`rounded-xl overflow-hidden ${
          isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-mint-100'
        } backdrop-blur-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={`p-8 ${isDarkMode ? 'bg-mint-600/20' : 'bg-mint-100/50'}`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.img
              src={selectedEmployee.avatar}
              alt={selectedEmployee.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            />
            <div className="text-center md:text-left">
              <motion.h1
                className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {selectedEmployee.name}
              </motion.h1>
              <motion.p
                className={`text-lg mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {selectedEmployee.position}
              </motion.p>
              <motion.span
                className={`inline-block mt-3 px-4 py-1 text-sm rounded-full ${
                  selectedEmployee.status === 'active'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {selectedEmployee.status === 'active' ? 'Active' : 'Inactive'}
              </motion.span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Email', value: selectedEmployee.email },
              { label: 'Phone', value: selectedEmployee.phone },
              { label: 'Department', value: selectedEmployee.department },
              { label: 'Position', value: selectedEmployee.position },
              { label: 'Salary', value: formatCurrency(selectedEmployee.salary), highlight: true },
              { label: 'Join Date', value: formatDate(selectedEmployee.joinDate) },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-mint-50'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.label}
                </p>
                <p className={`text-lg font-medium mt-1 ${
                  item.highlight 
                    ? isDarkMode ? 'text-mint-400' : 'text-mint-600'
                    : isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {isAdmin && (
            <motion.div
              className="flex gap-4 mt-8 pt-6 border-t border-mint-100 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => setIsEditModalOpen(true)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-mint-600 text-white hover:bg-mint-700' 
                    : 'bg-mint-500 text-white hover:bg-mint-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Edit Employee
              </motion.button>
              <motion.button
                onClick={() => setIsConfirmOpen(true)}
                className="flex-1 py-3 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Delete Employee
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Employee"
        size="lg"
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee.name}? This action cannot be undone.`}
      />
    </div>
  )
}

export default EmployeeDetail
