import useEmployeeStore from '../store/useEmployeeStore'
import StatsCard from '../components/StatsCard'
import { formatCurrency } from '../services/formatService'

function Dashboard() {
  const { employees, getStatistics } = useEmployeeStore()
  const stats = getStatistics()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-teal-800 animate-fade-in">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Tổng nhân viên" 
          value={stats.totalEmployees}
          subtitle="Tất cả nhân viên trong hệ thống"
          delay={0}
        />
        <StatsCard 
          title="Đang hoạt động" 
          value={stats.activeEmployees}
          subtitle={`${stats.inactiveEmployees} ngừng hoạt động`}
          delay={100}
        />
        <StatsCard 
          title="Phòng ban" 
          value={stats.departmentStats.length}
          subtitle="Các phòng ban hiện có"
          delay={200}
        />
        <StatsCard 
          title="Tổng lương tháng" 
          value={formatCurrency(stats.totalSalary)}
          subtitle={`TB: ${formatCurrency(stats.avgSalary)}/người`}
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
            {stats.departmentStats.map((dept, index) => (
              <div 
                key={dept.name} 
                className="flex items-center justify-between p-4 bg-teal-50/50 rounded-lg hover:bg-teal-50 transition-all duration-200 hover:scale-[1.01] animate-slide-in-left"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div>
                  <p className="font-medium text-teal-800">{dept.name}</p>
                  <p className="text-sm text-teal-600">{dept.count} nhân viên ({dept.activeCount} hoạt động)</p>
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
                className="flex items-center gap-4 p-3 bg-teal-50/50 rounded-lg hover:bg-teal-50 transition-all duration-200 hover:scale-[1.01] animate-slide-in-right"
                style={{ animationDelay: `${600 + index * 100}ms` }}
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

      <div 
        className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100 shadow-lg shadow-teal-100/50 animate-slide-up"
        style={{ animationDelay: '700ms' }}
      >
        <h3 className="text-lg font-semibold text-teal-800 mb-4">Phân bố nhân viên theo phòng ban</h3>
        <div className="flex flex-wrap gap-4">
          {stats.departmentStats.map((dept, index) => {
            const percentage = stats.totalEmployees > 0 
              ? Math.round((dept.count / stats.totalEmployees) * 100) 
              : 0
            return (
              <div 
                key={dept.name}
                className="flex-1 min-w-[200px] animate-slide-up"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-teal-700 font-medium">{dept.name}</span>
                  <span className="text-teal-600">{percentage}%</span>
                </div>
                <div className="h-3 bg-teal-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${percentage}%`,
                      animation: 'slideInLeft 1s ease-out forwards',
                      animationDelay: `${900 + index * 100}ms`
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
