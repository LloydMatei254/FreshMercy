import { apiClient } from '@/lib/axios'
import type { ApiResponse } from '@/types'

export const newsletterService = {
  async subscribe(email: string, source = 'website'): Promise<ApiResponse<{ email: string }>> {
    const res = await apiClient.post<ApiResponse<{ email: string }>>(
      '/newsletter/subscribe',
      { email, source },
    )
    return res.data
  },

  async unsubscribe(token: string): Promise<ApiResponse<null>> {
    const res = await apiClient.post<ApiResponse<null>>(
      '/newsletter/unsubscribe',
      { token },
    )
    return res.data
  },
}
