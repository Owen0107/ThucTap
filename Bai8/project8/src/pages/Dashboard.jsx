import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useUIStore from '../store/useUIStore'
import useAuthStore from '../store/useAuthStore'
import { employeeService } from '../services/employeeService'
import StatsCard from '../components/StatsCard'
import { SkeletonStats } from '../components/Skeleton'
import { formatCurrency } from '../utils/formatters'

const Dashboard = () => {
  const { isDarkMode } = useUIStore()
  const { user } = useAuthStore()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [recentEmployees, setRecentEmployees] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        const [employeesData, departmentsData] = await Promise.all([
          employeeService.getEmployees({ page: 1, limit: 100 }),
          employeeService.getDepartments(),
        ])

        const employees = employeesData.data
        const activeCount = employees.filter((e) => e.status === 'active').length
        const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0)
        const avgSalary = employees.length > 0 ? totalSalary / employees.length : 0

        setStats({
          totalEmployees: employees.length,
          activeEmployees: activeCount,
          totalDepartments: departmentsData.length,
          averageSalary: avgSalary,
        })

        const sorted = [...employees].sort(
          (a, b) => new Date(b.joinDate) - new Date(a.joinDate)
        )
        setRecentEmployees(sorted.slice(0, 5))
      } catch (error) {
        console.error('Failed to fetch stats')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Welcome back, {user?.name}!
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Here's what's happening with your team today.
        </p>
      </motion.div>

      {isLoading ? (
        <SkeletonStats />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Employees"
            value={stats?.totalEmployees || 0}
            subtitle="All registered employees"
            index={0}
          />
          <StatsCard
            title="Active Employees"
            value={stats?.activeEmployees || 0}
            subtitle="Currently working"
            index={1}
          />
          <StatsCard
            title="Departments"
            value={stats?.totalDepartments || 0}
            subtitle="Active departments"
            index={2}
          />
          <StatsCard
            title="Avg. Salary"
            value={formatCurrency(stats?.averageSalary || 0)}
            subtitle="Average monthly salary"
            index={3}
          />
        </div>
      )}

      <motion.div
        className={`rounded-xl ${
          isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-mint-100'
        } backdrop-blur-sm overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-mint-100'}`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Recent Employees
          </h2>
        </div>
        <div className="divide-y divide-mint-100 dark:divide-gray-700">
          {recentEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              className={`p-4 flex items-center gap-4 ${
                isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-mint-50'
              } transition-colors`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-12 h-12 rounded-full border-2 border-mint-400"
              />
              <div className="flex-1">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {employee.name}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {employee.position} - {employee.department}
                </p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                employee.status === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {employee.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className={`rounded-xl p-6 ${
            isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-mint-100'
          } backdrop-blur-sm`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            {user?.role === 'admin' && (
              <motion.a
                href="/employees"
                className={`block p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-mint-50 hover:bg-mint-100'
                } transition-colors`}
                whileHover={{ x: 4 }}
              >
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Manage Employees
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Add, edit, or remove employee records
                </p>
              </motion.a>
            )}
            <motion.a
              href="/employees"
              className={`block p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-mint-50 hover:bg-mint-100'
              } transition-colors`}
              whileHover={{ x: 4 }}
            >
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                View All Employees
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Browse and search employee directory
              </p>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-xl p-6 ${
            isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-mint-100'
          } backdrop-blur-sm`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            System Info
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Your Role</span>
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Email</span>
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {user?.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Session</span>
              <span className={`font-medium text-green-500`}>Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
