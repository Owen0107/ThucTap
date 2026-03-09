import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { employeeSchema } from '../utils/validationSchemas'
import { employeeService } from '../services/employeeService'
import useUIStore from '../store/useUIStore'

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const { isDarkMode } = useUIStore()
  const [departments, setDepartments] = useState([])
  const isEditing = !!employee

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: 0,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
    },
  })

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await employeeService.getDepartments()
        setDepartments(data)
      } catch (error) {
        console.error('Failed to fetch departments')
      }
    }
    fetchDepartments()
  }, [])

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
        status: employee.status,
        joinDate: employee.joinDate,
      })
    }
  }, [employee, reset])

  const onFormSubmit = async (data) => {
    await onSubmit(data)
  }

  const inputClass = `w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20'
      : 'bg-white border-mint-200 text-gray-800 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20'
  }`

  const labelClass = `block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`

  const errorClass = 'text-red-500 text-xs mt-1'

  return (
    <motion.form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            {...register('name')}
            className={inputClass}
            placeholder="Enter full name"
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            {...register('email')}
            type="email"
            className={inputClass}
            placeholder="Enter email"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Phone</label>
          <input
            {...register('phone')}
            className={inputClass}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Department</label>
          <select {...register('department')} className={inputClass}>
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && <p className={errorClass}>{errors.department.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Position</label>
          <input
            {...register('position')}
            className={inputClass}
            placeholder="Enter position"
          />
          {errors.position && <p className={errorClass}>{errors.position.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Salary (VND)</label>
          <input
            {...register('salary', { valueAsNumber: true })}
            type="number"
            className={inputClass}
            placeholder="Enter salary"
          />
          {errors.salary && <p className={errorClass}>{errors.salary.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select {...register('status')} className={inputClass}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className={errorClass}>{errors.status.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Join Date</label>
          <input
            {...register('joinDate')}
            type="date"
            className={inputClass}
          />
          {errors.joinDate && <p className={errorClass}>{errors.joinDate.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <motion.button
          type="button"
          onClick={onCancel}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
            isSubmitting
              ? 'bg-mint-400 cursor-not-allowed'
              : 'bg-mint-500 hover:bg-mint-600'
          }`}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </motion.button>
      </div>
    </motion.form>
  )
}

export default EmployeeForm
