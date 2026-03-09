import { create } from 'zustand'
import { employeeService } from '../services/employeeService'

const useEmployeeStore = create((set, get) => ({
  employees: [],
  selectedEmployee: null,
  totalCount: 0,
  isLoading: false,
  error: null,

  currentPage: 1,
  pageSize: 6,
  searchQuery: '',
  departmentFilter: '',
  statusFilter: '',

  fetchEmployees: async () => {
    set({ isLoading: true, error: null })
    try {
      const { currentPage, pageSize, searchQuery, departmentFilter, statusFilter } = get()
      const result = await employeeService.getEmployees({
        page: currentPage,
        limit: pageSize,
        search: searchQuery,
        department: departmentFilter,
        status: statusFilter,
      })
      set({
        employees: Array.isArray(result.data) ? result.data : [],
        totalCount: result.total || 0,
        isLoading: false,
      })
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch employees', employees: [] })
    }
  },

  fetchEmployeeById: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const employee = await employeeService.getEmployeeById(id)
      set({ selectedEmployee: employee, isLoading: false })
      return employee
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch employee' })
      return null
    }
  },

  createEmployee: async (data) => {
    const tempId = Date.now()
    const optimisticEmployee = {
      id: tempId,
      ...data,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0d9488&color=fff`,
    }
    
    set((state) => ({
      employees: [optimisticEmployee, ...state.employees],
      totalCount: state.totalCount + 1,
    }))

    try {
      const newEmployee = await employeeService.createEmployee(data)
      set((state) => ({
        employees: state.employees.map((e) =>
          e.id === tempId ? newEmployee : e
        ),
      }))
      return { success: true, data: newEmployee }
    } catch (error) {
      set((state) => ({
        employees: state.employees.filter((e) => e.id !== tempId),
        totalCount: state.totalCount - 1,
      }))
      return { success: false, message: 'Failed to create employee' }
    }
  },

  updateEmployee: async (id, data) => {
    const previousEmployees = get().employees
    
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    }))

    try {
      const updated = await employeeService.updateEmployee(id, data)
      set((state) => ({
        employees: state.employees.map((e) =>
          e.id === id ? updated : e
        ),
        selectedEmployee: state.selectedEmployee?.id === id ? updated : state.selectedEmployee,
      }))
      return { success: true, data: updated }
    } catch (error) {
      set({ employees: previousEmployees })
      return { success: false, message: 'Failed to update employee' }
    }
  },

  deleteEmployee: async (id) => {
    const previousEmployees = get().employees
    const previousCount = get().totalCount
    
    set((state) => ({
      employees: state.employees.filter((e) => e.id !== id),
      totalCount: state.totalCount - 1,
    }))

    try {
      await employeeService.deleteEmployee(id)
      return { success: true }
    } catch (error) {
      set({ employees: previousEmployees, totalCount: previousCount })
      return { success: false, message: 'Failed to delete employee' }
    }
  },

  setPage: (page) => {
    set({ currentPage: page })
    get().fetchEmployees()
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 })
  },

  setDepartmentFilter: (department) => {
    set({ departmentFilter: department, currentPage: 1 })
    get().fetchEmployees()
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status, currentPage: 1 })
    get().fetchEmployees()
  },

  clearFilters: () => {
    set({
      searchQuery: '',
      departmentFilter: '',
      statusFilter: '',
      currentPage: 1,
    })
    get().fetchEmployees()
  },
}))

export default useEmployeeStore
