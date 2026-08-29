import { apiClient } from '@/lib/axios'
import type { ApiResponse, ContactFormData } from '@/types'

export const contactService = {
  async send(data: ContactFormData): Promise<ApiResponse<{ id: string }>> {
    const res = await apiClient.post<ApiResponse<{ id: string }>>(
      '/contact',
      data,
    )
    return res.data
  },
}
