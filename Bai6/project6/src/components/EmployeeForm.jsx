import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { departments, positions } from '../data/mockData'

function EmployeeForm({ onSubmit, initialData, onCancel }) {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    defaultValues: initialData || {
      name: '',
      email: '',
      department: '',
      position: '',
      salary: '',
      status: 'active'
    }
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const onFormSubmit = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
        <label className="block text-sm font-medium text-teal-700 mb-1">Họ và tên</label>
        <input
          {...register('name', { required: 'Vui lòng nhập họ tên' })}
          type="text"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.name ? 'border-red-300' : 'border-teal-200'
          } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white text-teal-800`}
          placeholder="Nhập họ và tên"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '50ms' }}>
        <label className="block text-sm font-medium text-teal-700 mb-1">Email</label>
        <input
          {...register('email', { 
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ'
            }
          })}
          type="email"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.email ? 'border-red-300' : 'border-teal-200'
          } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white text-teal-800`}
          placeholder="Nhập email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <label className="block text-sm font-medium text-teal-700 mb-1">Phòng ban</label>
          <select
            {...register('department', { required: 'Vui lòng chọn phòng ban' })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.department ? 'border-red-300' : 'border-teal-200'
            } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white text-teal-800`}
          >
            <option value="">Chọn phòng ban</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department.message}</p>}
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
          <label className="block text-sm font-medium text-teal-700 mb-1">Vị trí</label>
          <select
            {...register('position', { required: 'Vui lòng chọn vị trí' })}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.position ? 'border-red-300' : 'border-teal-200'
            } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white text-teal-800`}
          >
            <option value="">Chọn vị trí</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <label className="block text-sm font-medium text-teal-700 mb-1">Lương (VNĐ)</label>
          <input
            {...register('salary', { 
              required: 'Vui lòng nhập lương',
              min: { value: 1000000, message: 'Lương tối thiểu 1.000.000 VNĐ' }
            })}
            type="number"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.salary ? 'border-red-300' : 'border-teal-200'
            } focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white text-teal-800`}
            placeholder="Nhập lương"
          />
          {errors.salary && <p className="mt-1 text-sm text-red-500">{errors.salary.message}</p>}
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '250ms' }}>
          <label className="block text-sm font-medium text-teal-700 mb-1">Trạng thái</label>
          <select
            {...register('status')}
            className="w-full px-4 py-2.5 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white text-teal-800"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 border border-teal-200 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors duration-200 font-medium"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200 font-medium shadow-lg shadow-teal-200"
        >
          {initialData ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm
