import { apiClient } from '@/lib/axios'
import type {
  ApiResponse,
  PaginatedResponse,
  Devotional,
  DevotionalSummary,
} from '@/types'

export interface DevotionalFilters {
  page?: number
  pageSize?: number
  category?: string
  tag?: string
  search?: string
  status?: 'PUBLISHED'
}

export const devotionalService = {
  async getAll(filters: DevotionalFilters = {}): Promise<PaginatedResponse<DevotionalSummary>> {
    const params = new URLSearchParams()
    if (filters.page)     params.set('page', String(filters.page))
    if (filters.pageSize) params.set('pageSize', String(filters.pageSize))
    if (filters.category) params.set('category', filters.category)
    if (filters.tag)      params.set('tag', filters.tag)
    if (filters.search)   params.set('search', filters.search)
    const res = await apiClient.get<PaginatedResponse<DevotionalSummary>>(
      `/devotionals?${params}`,
    )
    return res.data
  },

  async getBySlug(slug: string): Promise<ApiResponse<Devotional>> {
    const res = await apiClient.get<ApiResponse<Devotional>>(`/devotionals/${slug}`)
    return res.data
  },

  async getFeatured(): Promise<ApiResponse<DevotionalSummary>> {
    const res = await apiClient.get<ApiResponse<DevotionalSummary>>('/devotionals/featured')
    return res.data
  },

  async getToday(): Promise<ApiResponse<DevotionalSummary>> {
    const res = await apiClient.get<ApiResponse<DevotionalSummary>>('/devotionals/today')
    return res.data
  },

  async getRelated(slug: string, limit = 3): Promise<ApiResponse<DevotionalSummary[]>> {
    const res = await apiClient.get<ApiResponse<DevotionalSummary[]>>(
      `/devotionals/${slug}/related?limit=${limit}`,
    )
    return res.data
  },
}
