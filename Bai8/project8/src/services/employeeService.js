import api from './api'

export const employeeService = {
  getEmployees: async ({ page = 1, limit = 6, search = '', department = '', status = '' }) => {
    try {
      let url = `/employees?_page=${page}&_limit=${limit}`
      
      if (search) {
        url += `&name_like=${encodeURIComponent(search)}`
      }
      if (department) {
        url += `&department=${encodeURIComponent(department)}`
      }
      if (status) {
        url += `&status=${encodeURIComponent(status)}`
      }

      const response = await api.get(url)
      const total = parseInt(response.headers['x-total-count'] || '0', 10)
      
      return {
        data: response.data,
        total: total || response.data.length,
      }
    } catch (error) {
      throw new Error('Failed to fetch employees')
    }
  },

  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch employee')
    }
  },

  createEmployee: async (data) => {
    try {
      const employeeData = {
        ...data,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0d9488&color=fff`,
      }
      const response = await api.post('/employees', employeeData)
      return response.data
    } catch (error) {
      throw new Error('Failed to create employee')
    }
  },

  updateEmployee: async (id, data) => {
    try {
      const response = await api.put(`/employees/${id}`, data)
      return response.data
    } catch (error) {
      throw new Error('Failed to update employee')
    }
  },

  deleteEmployee: async (id) => {
    try {
      await api.delete(`/employees/${id}`)
      return { success: true }
    } catch (error) {
      throw new Error('Failed to delete employee')
    }
  },

  getDepartments: async () => {
    try {
      const response = await api.get('/departments')
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch departments')
    }
  },
}
