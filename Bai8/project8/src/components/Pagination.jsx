import { motion } from 'framer-motion'
import useUIStore from '../store/useUIStore'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { isDarkMode } = useUIStore()

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg font-medium transition-all ${
          currentPage === 1
            ? isDarkMode
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isDarkMode
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-white text-gray-700 hover:bg-mint-100'
        }`}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        Previous
      </motion.button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <motion.button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`w-10 h-10 rounded-lg font-medium transition-all ${
              page === currentPage
                ? 'bg-mint-500 text-white shadow-lg shadow-mint-500/30'
                : page === '...'
                ? isDarkMode
                  ? 'text-gray-500 cursor-default'
                  : 'text-gray-400 cursor-default'
                : isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-white text-gray-700 hover:bg-mint-100'
            }`}
            whileHover={page !== '...' && page !== currentPage ? { scale: 1.1 } : {}}
            whileTap={page !== '...' && page !== currentPage ? { scale: 0.9 } : {}}
          >
            {page}
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages
            ? isDarkMode
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isDarkMode
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-white text-gray-700 hover:bg-mint-100'
        }`}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        Next
      </motion.button>
    </motion.div>
  )
}

export default Pagination
