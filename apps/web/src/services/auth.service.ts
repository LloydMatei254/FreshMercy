import { apiClient } from '@/lib/axios'
import type { ApiResponse, AdminUser, LoginFormData } from '@/types'

export const authService = {
  async login(data: LoginFormData): Promise<ApiResponse<{ token: string; user: AdminUser }>> {
    const res = await apiClient.post<ApiResponse<{ token: string; user: AdminUser }>>(
      '/admin/auth/login',
      data,
    )
    if (res.data.success) {
      localStorage.setItem('fm_token', res.data.data.token)
    }
    return res.data
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/admin/auth/logout')
    } finally {
      localStorage.removeItem('fm_token')
    }
  },

  async getMe(): Promise<ApiResponse<AdminUser>> {
    const res = await apiClient.get<ApiResponse<AdminUser>>('/admin/auth/me')
    return res.data
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('fm_token')
  },
}
