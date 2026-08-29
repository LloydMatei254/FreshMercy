import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, X, Star } from 'lucide-react'
import { apiClient } from '@/lib/axios'
import { Badge } from '@/components/ui/Badge'
import { formatRelative } from '@/lib/utils'
import type { ApiResponse, Story } from '@/types'

export default function AdminStoriesPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'stories'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Story[]>>('/admin/stories')
      return res.data
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, approved }: { id: string; approved: boolean }) =>
      apiClient.put(`/admin/stories/${id}/approve`, { approved }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'stories'] }),
  })

  const stories = data?.data ?? []

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-forest">Stories of Mercy</h1>
        <p className="text-sm text-[#7A7A6A] mt-1">
          {stories.filter(s => !s.approved).length} pending approval
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-parchment border border-gold/10 p-6 h-28 animate-pulse" />
          ))}
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-16 text-[#7A7A6A]">
          <Star className="h-10 w-10 text-gold/40 mx-auto mb-4" />
          <p>No stories submitted yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {stories.map((story) => (
            <div
              key={story.id}
              className={`bg-parchment rounded-2xl border p-5 ${
                !story.approved ? 'border-gold/30' : 'border-gold/10 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-forest">{story.name}</span>
                    {story.location && (
                      <span className="text-xs text-[#7A7A6A]">{story.location}</span>
                    )}
                    <Badge variant={story.approved ? 'forest' : 'new'}>
                      {story.approved ? 'Approved' : 'Pending'}
                    </Badge>
                    <span className="text-xs text-[#7A7A6A]">{formatRelative(story.createdAt)}</span>
                  </div>
                  <p className="text-sm text-[#4A4A3A] leading-relaxed">{story.story}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!story.approved ? (
                    <button
                      onClick={() => updateMutation.mutate({ id: story.id, approved: true })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => updateMutation.mutate({ id: story.id, approved: false })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
