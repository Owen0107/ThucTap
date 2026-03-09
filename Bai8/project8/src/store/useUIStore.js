import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUIStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      sidebarOpen: true,
      
      toggleDarkMode: () => {
        set((state) => {
          const newMode = !state.isDarkMode
          if (newMode) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { isDarkMode: newMode }
        })
      },
      
      setDarkMode: (value) => {
        set({ isDarkMode: value })
        if (value) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }))
      },
      
      setSidebarOpen: (value) => {
        set({ sidebarOpen: value })
      },
    }),
    {
      name: 'ui-storage',
    }
  )
)

export default useUIStore
