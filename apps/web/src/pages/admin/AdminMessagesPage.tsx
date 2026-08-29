import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, MailOpen } from 'lucide-react'
import { apiClient } from '@/lib/axios'
import { Badge } from '@/components/ui/Badge'
import { formatRelative } from '@/lib/utils'
import type { ApiResponse, ContactMessage } from '@/types'

export default function AdminMessagesPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'messages'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<ContactMessage[]>>('/admin/messages')
      return res.data
    },
  })

  const markReadMutation = useMutation({
    mutationFn: (id: string) => apiClient.put(`/admin/messages/${id}`, { isRead: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'messages'] }),
  })

  const messages = data?.data ?? []

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-forest">Contact Messages</h1>
        <p className="text-sm text-[#7A7A6A] mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''}</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-parchment border border-gold/10 p-6 h-28 animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 text-[#7A7A6A]">
          <Mail className="h-10 w-10 text-gold/40 mx-auto mb-4" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-parchment rounded-2xl border p-5 ${!msg.isRead ? 'border-gold/30' : 'border-gold/10 opacity-80'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-forest">{msg.name}</span>
                    <a href={`mailto:${msg.email}`} className="text-xs text-gold hover:underline">{msg.email}</a>
                    {!msg.isRead && <Badge variant="new">New</Badge>}
                    <span className="text-xs text-[#7A7A6A]">{formatRelative(msg.createdAt)}</span>
                  </div>
                  <p className="text-sm text-[#4A4A3A] leading-relaxed">{msg.message}</p>
                </div>
                {!msg.isRead && (
                  <button
                    onClick={() => markReadMutation.mutate(msg.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-forest bg-cream border border-gold/20 hover:bg-parchment transition-colors shrink-0"
                    title="Mark as read"
                  >
                    <MailOpen className="h-3.5 w-3.5" />
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
