import StatsCard from './StatsCard'

function Dashboard({ employees }) {
  const totalEmployees = employees.length
  const activeEmployees = employees.filter(e => e.status === 'active').length
  const departments = [...new Set(employees.map(e => e.department))]
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0)

  const departmentStats = departments.map(dept => ({
    name: dept,
    count: employees.filter(e => e.department === dept).length,
    totalSalary: employees.filter(e => e.department === dept).reduce((sum, e) => sum + e.salary, 0)
  }))

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-teal-800 animate-fade-in">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Tổng nhân viên" 
          value={totalEmployees}
          delay={0}
        />
        <StatsCard 
          title="Đang hoạt động" 
          value={activeEmployees}
          delay={100}
        />
        <StatsCard 
          title="Phòng ban" 
          value={departments.length}
          delay={200}
        />
        <StatsCard 
          title="Tổng lương tháng" 
          value={formatCurrency(totalSalary)}
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-lg shadow-teal-100/50 animate-slide-up hover:shadow-xl transition-shadow duration-300"
          style={{ animationDelay: '400ms' }}
        >
          <h3 className="text-lg font-semibold text-teal-800 mb-4">Thống kê theo phòng ban</h3>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div 
                key={dept.name} 
                className="flex items-center justify-between p-4 bg-teal-50/50 rounded-lg hover:bg-teal-50 transition-all duration-200 hover:scale-[1.01]"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div>
                  <p className="font-medium text-teal-800">{dept.name}</p>
                  <p className="text-sm text-teal-600">{dept.count} nhân viên</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-teal-700">{formatCurrency(dept.totalSalary)}</p>
                  <p className="text-xs text-teal-500">Tổng lương</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-lg shadow-teal-100/50 animate-slide-up hover:shadow-xl transition-shadow duration-300"
          style={{ animationDelay: '500ms' }}
        >
          <h3 className="text-lg font-semibold text-teal-800 mb-4">Nhân viên mới nhất</h3>
          <div className="space-y-3">
            {employees.slice(-5).reverse().map((emp, index) => (
              <div 
                key={emp.id}
                className="flex items-center gap-4 p-3 bg-teal-50/50 rounded-lg hover:bg-teal-50 transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                  {emp.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-teal-800">{emp.name}</p>
                  <p className="text-sm text-teal-600">{emp.position}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  emp.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {emp.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
