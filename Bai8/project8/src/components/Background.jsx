import { motion } from 'framer-motion'
import useUIStore from '../store/useUIStore'

const Background = ({ children }) => {
  const { isDarkMode } = useUIStore()

  return (
    <div className={`min-h-screen w-full relative ${isDarkMode ? 'bg-gray-900' : 'bg-[#f0fdfa]'}`}>
      {!isDarkMode && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, 
                rgba(240,253,250,1) 0%, 
                rgba(204,251,241,0.7) 30%, 
                rgba(153,246,228,0.5) 60%, 
                rgba(94,234,212,0.4) 100%
              ),
              radial-gradient(circle at 40% 30%, rgba(255,255,255,0.8) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(167,243,208,0.5) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(209,250,229,0.6) 0%, transparent 45%)
            `,
          }}
        />
      )}
      {isDarkMode && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, 
                rgba(17,24,39,1) 0%, 
                rgba(31,41,55,0.9) 30%, 
                rgba(17,24,39,0.95) 60%, 
                rgba(31,41,55,1) 100%
              ),
              radial-gradient(circle at 40% 30%, rgba(13,148,136,0.1) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(20,184,166,0.08) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(15,118,110,0.1) 0%, transparent 45%)
            `,
          }}
        />
      )}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Background
