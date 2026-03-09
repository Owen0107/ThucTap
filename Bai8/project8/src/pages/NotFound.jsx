import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useUIStore from '../store/useUIStore'
import Background from '../components/Background'

const NotFound = () => {
  const { isDarkMode } = useUIStore()

  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          className={`text-center ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="text-8xl font-bold text-mint-500 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            404
          </motion.div>
          <motion.h1
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Page Not Found
          </motion.h1>
          <motion.p
            className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The page you're looking for doesn't exist.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-mint-500 text-white rounded-lg font-medium hover:bg-mint-600 transition-colors"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Background>
  )
}

export default NotFound
