import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/authService'

const TOKEN_EXPIRY_TIME = 60 * 60 * 1000

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const result = await authService.login(email, password)
          if (result.success) {
            const expiry = Date.now() + TOKEN_EXPIRY_TIME
            set({
              user: result.user,
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
              tokenExpiry: expiry,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
            get().startTokenExpiryCheck()
            return { success: true }
          } else {
            set({ isLoading: false, error: result.message })
            return { success: false, message: result.message }
          }
        } catch (error) {
          set({ isLoading: false, error: 'Login failed' })
          return { success: false, message: 'Login failed' }
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          tokenExpiry: null,
          isAuthenticated: false,
          error: null,
        })
        if (get().tokenCheckInterval) {
          clearInterval(get().tokenCheckInterval)
        }
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get()
        if (!refreshToken) {
          get().logout()
          return false
        }
        try {
          const result = await authService.refreshToken(refreshToken)
          if (result.success) {
            const expiry = Date.now() + TOKEN_EXPIRY_TIME
            set({
              accessToken: result.accessToken,
              tokenExpiry: expiry,
            })
            return true
          } else {
            get().logout()
            return false
          }
        } catch {
          get().logout()
          return false
        }
      },

      checkTokenExpiry: () => {
        const { tokenExpiry, isAuthenticated } = get()
        if (isAuthenticated && tokenExpiry) {
          const timeLeft = tokenExpiry - Date.now()
          if (timeLeft <= 0) {
            get().logout()
          } else if (timeLeft <= 5 * 60 * 1000) {
            get().refreshAccessToken()
          }
        }
      },

      startTokenExpiryCheck: () => {
        const interval = setInterval(() => {
          get().checkTokenExpiry()
        }, 60000)
        set({ tokenCheckInterval: interval })
      },

      tokenCheckInterval: null,

      hasRole: (requiredRole) => {
        const { user } = get()
        if (!user) return false
        if (requiredRole === 'admin') return user.role === 'admin'
        return true
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenExpiry: state.tokenExpiry,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

export default useAuthStore
