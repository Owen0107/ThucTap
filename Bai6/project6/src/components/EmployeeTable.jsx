import { useState } from 'react'
import Pagination from './Pagination'

function EmployeeTable({ employees, onAdd, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const itemsPerPage = 5

  const departments = [...new Set(employees.map(e => e.department))]

  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDepartment = !filterDepartment || emp.department === filterDepartment
    const matchStatus = !filterStatus || emp.status === filterStatus
    return matchSearch && matchDepartment && matchStatus
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa nhân viên ${name}?`)) {
      onDelete(id)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-800">Quản lý nhân viên</h1>
        <button
          onClick={onAdd}
          className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-teal-200 font-medium"
        >
          Thêm nhân viên
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-lg shadow-teal-100/50 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, vị trí..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white/50 text-teal-800 placeholder-teal-400"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => {
              setFilterDepartment(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2.5 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white/50 text-teal-800"
          >
            <option value="">Tất cả phòng ban</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2.5 rounded-lg border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white/50 text-teal-800"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-teal-100">
                <th className="text-left py-4 px-4 text-sm font-semibold text-teal-700">Nhân viên</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-teal-700">Phòng ban</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-teal-700">Vị trí</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-teal-700">Lương</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-teal-700">Trạng thái</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-teal-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((emp, index) => (
                <tr 
                  key={emp.id} 
                  className="border-b border-teal-50 hover:bg-teal-50/50 transition-colors duration-200 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-teal-800">{emp.name}</p>
                        <p className="text-sm text-teal-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-teal-700">{emp.department}</td>
                  <td className="py-4 px-4 text-teal-700">{emp.position}</td>
                  <td className="py-4 px-4 font-medium text-teal-700">{formatCurrency(emp.salary)}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {emp.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(emp)}
                        className="px-3 py-1.5 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors duration-200"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id, emp.name)}
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12 text-teal-500">
            Không tìm thấy nhân viên nào
          </div>
        )}

        {filteredEmployees.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-teal-600">
              Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredEmployees.length)} trong tổng số {filteredEmployees.length} nhân viên
            </p>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeTable
