import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,  // JWT auth via Authorization header, not cookies
})

// Attach JWT token from localStorage if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('fm_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 — clear token and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fm_token')
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  },
)
