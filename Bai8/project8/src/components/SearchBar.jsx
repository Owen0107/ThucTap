import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDebounce } from '../hooks/useDebounce'
import useUIStore from '../store/useUIStore'

const SearchBar = ({ onSearch, placeholder = 'Search...' }) => {
  const { isDarkMode } = useUIStore()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20'
            : 'bg-white border-mint-200 text-gray-800 placeholder-gray-400 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20'
        }`}
      />
      <svg
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {searchTerm && (
        <motion.button
          onClick={() => setSearchTerm('')}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <svg
            className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      )}
    </motion.div>
  )
}

export default SearchBar
