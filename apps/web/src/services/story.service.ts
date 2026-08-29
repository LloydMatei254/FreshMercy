import { apiClient } from '@/lib/axios'
import type { ApiResponse, Story } from '@/types'

export const storyService = {
  async getApproved(): Promise<ApiResponse<Story[]>> {
    const res = await apiClient.get<ApiResponse<Story[]>>('/stories')
    return res.data
  },
}
