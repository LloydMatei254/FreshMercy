import { apiClient } from '@/lib/axios'
import type { ApiResponse, PrayerFormData } from '@/types'

export const prayerService = {
  async submit(data: PrayerFormData): Promise<ApiResponse<{ id: string }>> {
    const res = await apiClient.post<ApiResponse<{ id: string }>>(
      '/prayer-requests',
      data,
    )
    return res.data
  },
}
