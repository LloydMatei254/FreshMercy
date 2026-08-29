import { useQuery } from '@tanstack/react-query'
import { devotionalService, type DevotionalFilters } from '@/services/devotional.service'

export const devotionalKeys = {
  all:      ['devotionals'] as const,
  lists:    () => [...devotionalKeys.all, 'list'] as const,
  list:     (filters: DevotionalFilters) => [...devotionalKeys.lists(), filters] as const,
  details:  () => [...devotionalKeys.all, 'detail'] as const,
  detail:   (slug: string) => [...devotionalKeys.details(), slug] as const,
  featured: () => [...devotionalKeys.all, 'featured'] as const,
  today:    () => [...devotionalKeys.all, 'today'] as const,
  related:  (slug: string) => [...devotionalKeys.all, 'related', slug] as const,
}

export function useDevotionals(filters: DevotionalFilters = {}) {
  return useQuery({
    queryKey: devotionalKeys.list(filters),
    queryFn:  () => devotionalService.getAll(filters),
  })
}

export function useDevotional(slug: string) {
  return useQuery({
    queryKey: devotionalKeys.detail(slug),
    queryFn:  () => devotionalService.getBySlug(slug),
    enabled:  !!slug,
  })
}

export function useFeaturedDevotional() {
  return useQuery({
    queryKey: devotionalKeys.featured(),
    queryFn:  devotionalService.getFeatured,
  })
}

export function useTodaysDevotional() {
  return useQuery({
    queryKey: devotionalKeys.today(),
    queryFn:  devotionalService.getToday,
    staleTime: 1000 * 60 * 60, // 1 hour — today's devotional doesn't change often
  })
}

export function useRelatedDevotionals(slug: string) {
  return useQuery({
    queryKey: devotionalKeys.related(slug),
    queryFn:  () => devotionalService.getRelated(slug),
    enabled:  !!slug,
  })
}
