import { motion } from 'framer-motion'
import useUIStore from '../store/useUIStore'

export const SkeletonCard = () => {
  const { isDarkMode } = useUIStore()
  
  return (
    <motion.div
      className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse`} />
        <div className="flex-1 space-y-2">
          <div className={`h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-3/4`} />
          <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-1/2`} />
        </div>
      </div>
      <div className="space-y-3">
        <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse`} />
        <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-5/6`} />
        <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-4/6`} />
      </div>
    </motion.div>
  )
}

export const SkeletonTable = ({ rows = 5 }) => {
  const { isDarkMode } = useUIStore()
  
  return (
    <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-mint-100'}`}>
        <div className={`h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-1/4`} />
      </div>
      <div className="divide-y divide-mint-100 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse`} />
            <div className="flex-1 grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={j}
                  className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse`}
                  style={{ animationDelay: `${j * 100}ms` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const SkeletonStats = () => {
  const { isDarkMode } = useUIStore()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-1/2 mb-4`} />
          <div className={`h-8 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-3/4`} />
        </motion.div>
      ))}
    </div>
  )
}

export const SkeletonDetail = () => {
  const { isDarkMode } = useUIStore()
  
  return (
    <div className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className={`w-32 h-32 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse mx-auto md:mx-0`} />
        <div className="flex-1 space-y-4">
          <div className={`h-6 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-1/2`} />
          <div className={`h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-1/3`} />
          <div className="grid grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-1/3`} />
                <div className={`h-4 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-mint-100'} animate-pulse w-2/3`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
