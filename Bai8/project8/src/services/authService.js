import api from './api'

const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.get('/users', {
        params: { email, password },
      })
      
      if (response.data.length > 0) {
        const user = response.data[0]
        const { password: _, ...userWithoutPassword } = user
        return {
          success: true,
          user: userWithoutPassword,
          accessToken: generateToken(),
          refreshToken: generateToken(),
        }
      }
      return { success: false, message: 'Invalid email or password' }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' }
    }
  },

  refreshToken: async (refreshToken) => {
    if (refreshToken) {
      return {
        success: true,
        accessToken: generateToken(),
      }
    }
    return { success: false, message: 'Invalid refresh token' }
  },

  logout: async () => {
    return { success: true }
  },
}
