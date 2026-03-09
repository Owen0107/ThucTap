import { motion } from 'framer-motion'
import useUIStore from '../store/useUIStore'

const StatsCard = ({ title, value, subtitle, index = 0 }) => {
  const { isDarkMode } = useUIStore()

  return (
    <motion.div
      className={`rounded-xl p-6 ${
        isDarkMode 
          ? 'bg-gray-800/80 border border-gray-700' 
          : 'bg-white/80 border border-mint-100'
      } backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {title}
      </p>
      <motion.p
        className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
      >
        {value}
      </motion.p>
      {subtitle && (
        <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default StatsCard
