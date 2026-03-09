import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import useUIStore from '../store/useUIStore'
import useAuthStore from '../store/useAuthStore'
import useEmployeeStore from '../store/useEmployeeStore'
import { employeeService } from '../services/employeeService'
import EmployeeCard from '../components/EmployeeCard'
import EmployeeForm from '../components/EmployeeForm'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import { SkeletonCard } from '../components/Skeleton'

const Employees = () => {
  const { isDarkMode } = useUIStore()
  const { user } = useAuthStore()
  const {
    employees,
    totalCount,
    isLoading,
    currentPage,
    pageSize,
    departmentFilter,
    statusFilter,
    fetchEmployees,
    setPage,
    setSearchQuery,
    setDepartmentFilter,
    setStatusFilter,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployeeStore()

  const [departments, setDepartments] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)

  const isAdmin = user?.role === 'admin'
  const totalPages = Math.ceil(totalCount / pageSize)

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await employeeService.getDepartments()
        setDepartments(data)
      } catch (error) {
        console.error('Failed to load departments')
      }
    }
    loadDepartments()
  }, [])

  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    fetchEmployees()
  }, [setSearchQuery, fetchEmployees])

  const handleCreate = () => {
    setSelectedEmployee(null)
    setIsModalOpen(true)
  }

  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee)
    setIsConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      const result = await deleteEmployee(employeeToDelete.id)
      if (result.success) {
        toast.success('Employee deleted successfully')
      } else {
        toast.error(result.message)
      }
    }
    setIsConfirmOpen(false)
    setEmployeeToDelete(null)
  }

  const handleSubmit = async (data) => {
    if (selectedEmployee) {
      const result = await updateEmployee(selectedEmployee.id, {
        ...selectedEmployee,
        ...data,
      })
      if (result.success) {
        toast.success('Employee updated successfully')
        setIsModalOpen(false)
      } else {
        toast.error(result.message)
      }
    } else {
      const result = await createEmployee(data)
      if (result.success) {
        toast.success('Employee created successfully')
        setIsModalOpen(false)
      } else {
        toast.error(result.message)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Employees
          </h1>
          <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your team members
          </p>
        </motion.div>

        {isAdmin && (
          <motion.button
            onClick={handleCreate}
            className="px-4 py-2 bg-mint-500 text-white rounded-lg font-medium hover:bg-mint-600 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Employee
          </motion.button>
        )}
      </div>

      <motion.div
        className={`p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-sm`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <SearchBar onSearch={handleSearch} placeholder="Search employees..." />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={`px-4 py-3 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-mint-200 text-gray-800'
            }`}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-3 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-mint-200 text-gray-800'
            }`}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : !Array.isArray(employees) || employees.length === 0 ? (
        <motion.div
          className={`text-center py-12 rounded-xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No employees found
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {employees.map((employee, index) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEmployee ? 'Edit Employee' : 'Add Employee'}
        size="lg"
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  )
}

export default Employees
