import { create } from 'zustand'

const useUIStore = create((set) => ({
  currentPage: 'dashboard',
  sidebarOpen: true,
  isModalOpen: false,
  editingEmployee: null,

  setCurrentPage: (page) => set({ currentPage: page }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  openAddModal: () => set({ 
    isModalOpen: true, 
    editingEmployee: null 
  }),

  openEditModal: (employee) => set({ 
    isModalOpen: true, 
    editingEmployee: employee 
  }),

  closeModal: () => set({ 
    isModalOpen: false, 
    editingEmployee: null 
  })
}))

export default useUIStore
