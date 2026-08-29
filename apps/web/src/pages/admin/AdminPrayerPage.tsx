import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart, Check, Archive } from 'lucide-react'
import { apiClient } from '@/lib/axios'
import { Badge } from '@/components/ui/Badge'
import { formatRelative } from '@/lib/utils'
import type { ApiResponse, PrayerRequest } from '@/types'

export default function AdminPrayerPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'prayer-requests'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<PrayerRequest[]>>('/admin/prayer-requests')
      return res.data
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiClient.put(`/admin/prayer-requests/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'prayer-requests'] }),
  })

  const requests = data?.data ?? []

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-forest">Prayer Requests</h1>
        <p className="text-sm text-[#7A7A6A] mt-1">
          {requests.length} request{requests.length !== 1 ? 's' : ''} — read every one and pray.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-parchment border border-gold/10 p-6 h-24 animate-pulse" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 text-[#7A7A6A]">
          <Heart className="h-10 w-10 text-gold/40 mx-auto mb-4" />
          <p>No prayer requests yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className={`bg-parchment rounded-2xl border p-5 ${
                req.status === 'NEW' ? 'border-gold/30' : 'border-gold/10 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-forest">
                      {req.isAnonymous ? 'Anonymous' : (req.name || 'Unknown')}
                    </span>
                    <Badge variant={req.status === 'NEW' ? 'new' : 'default'}>
                      {req.status}
                    </Badge>
                    <span className="text-xs text-[#7A7A6A]">{formatRelative(req.createdAt)}</span>
                  </div>
                  <p className="text-sm text-[#4A4A3A] leading-relaxed">{req.request}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {req.status !== 'PRAYED' && (
                    <button
                      onClick={() => updateMutation.mutate({ id: req.id, status: 'PRAYED' })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                      title="Mark as prayed"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Prayed
                    </button>
                  )}
                  {req.status !== 'ARCHIVED' && (
                    <button
                      onClick={() => updateMutation.mutate({ id: req.id, status: 'ARCHIVED' })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#7A7A6A] bg-cream border border-gold/20 hover:bg-parchment transition-colors"
                      title="Archive"
                    >
                      <Archive className="h-3.5 w-3.5" />
                      Archive
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
