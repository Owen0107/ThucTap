import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useUIStore from '../store/useUIStore'
import { employeeService } from '../services/employeeService'
import { SkeletonCard } from '../components/Skeleton'

const Departments = () => {
  const { isDarkMode } = useUIStore()
  const [departments, setDepartments] = useState([])
  const [employeeCounts, setEmployeeCounts] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [deptData, empData] = await Promise.all([
          employeeService.getDepartments(),
          employeeService.getEmployees({ page: 1, limit: 100 }),
        ])
        
        setDepartments(deptData)
        
        const counts = {}
        empData.data.forEach((emp) => {
          counts[emp.department] = (counts[emp.department] || 0) + 1
        })
        setEmployeeCounts(counts)
      } catch (error) {
        console.error('Failed to fetch departments')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Departments
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Overview of all departments
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            className={`rounded-xl p-6 ${
              isDarkMode 
                ? 'bg-gray-800/80 border border-gray-700' 
                : 'bg-white/80 border border-mint-100'
            } backdrop-blur-sm hover:shadow-lg transition-all`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {dept.name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-mint-600/20 text-mint-400' 
                  : 'bg-mint-100 text-mint-700'
              }`}>
                {employeeCounts[dept.name] || 0} employees
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {dept.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Departments
