import { create } from 'zustand'
import { employees as initialEmployees, departments, positions } from '../data/mockData'

const useEmployeeStore = create((set, get) => ({
  employees: initialEmployees,
  departments,
  positions,
  
  addEmployee: (data) => set((state) => ({
    employees: [
      ...state.employees,
      {
        ...data,
        id: Math.max(...state.employees.map(e => e.id), 0) + 1,
        salary: Number(data.salary)
      }
    ]
  })),

  updateEmployee: (id, data) => set((state) => ({
    employees: state.employees.map(emp =>
      emp.id === id
        ? { ...data, id, salary: Number(data.salary) }
        : emp
    )
  })),

  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter(emp => emp.id !== id)
  })),

  getEmployeeById: (id) => {
    return get().employees.find(emp => emp.id === id)
  },

  getStatistics: () => {
    const employees = get().employees
    const totalEmployees = employees.length
    const activeEmployees = employees.filter(e => e.status === 'active').length
    const inactiveEmployees = employees.filter(e => e.status === 'inactive').length
    const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0)
    const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0

    const departmentStats = get().departments.map(dept => ({
      name: dept,
      count: employees.filter(e => e.department === dept).length,
      totalSalary: employees.filter(e => e.department === dept).reduce((sum, e) => sum + e.salary, 0),
      activeCount: employees.filter(e => e.department === dept && e.status === 'active').length
    }))

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalSalary,
      avgSalary,
      departmentStats
    }
  }
}))

export default useEmployeeStore
