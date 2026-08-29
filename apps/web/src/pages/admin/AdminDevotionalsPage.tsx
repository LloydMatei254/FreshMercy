import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { apiClient } from '@/lib/axios'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SkeletonCard } from '@/components/ui/LoadingSpinner'
import { formatDateShort } from '@/lib/utils'
import type { ApiResponse, PaginatedResponse, DevotionalSummary } from '@/types'

function useAdminDevotionals(page = 1) {
  return useQuery({
    queryKey: ['admin', 'devotionals', page],
    queryFn: async () => {
      const res = await apiClient.get<PaginatedResponse<DevotionalSummary>>(
        `/admin/devotionals?page=${page}&pageSize=20`,
      )
      return res.data
    },
  })
}

export default function AdminDevotionalsPage() {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  const { data, isLoading } = useAdminDevotionals(page)

  const publishMutation = useMutation({
    mutationFn: (id: string) => apiClient.post(`/admin/devotionals/${id}/publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'devotionals'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/admin/devotionals/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'devotionals'] }),
  })

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteMutation.mutate(id)
    }
  }

  const items = data?.data?.items ?? []
  const totalPages = data?.data?.totalPages ?? 1

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-forest">Devotionals</h1>
          <p className="text-sm text-[#7A7A6A] mt-1">
            {data?.data?.total ?? 0} total
          </p>
        </div>
        <Button asChild variant="primary" size="md">
          <Link to="/admin/devotionals/new">
            <Plus className="h-4 w-4" />
            New Devotional
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="bg-parchment rounded-2xl border border-gold/15 overflow-hidden">
          <table className="w-full text-sm" role="table" aria-label="Devotionals list">
            <thead>
              <tr className="border-b border-gold/15 text-[10px] font-bold tracking-wider uppercase text-[#7A7A6A]">
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Author</th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">Published</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id} className="border-b border-gold/10 hover:bg-cream/60 transition-colors">
                  <td className="px-5 py-4 font-medium text-forest max-w-xs truncate">
                    {d.title}
                  </td>
                  <td className="px-5 py-4 text-[#7A7A6A] hidden md:table-cell">{d.author}</td>
                  <td className="px-5 py-4 text-[#7A7A6A] hidden lg:table-cell">
                    {d.publishedAt ? formatDateShort(d.publishedAt) : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={d.publishedAt ? 'forest' : 'default'}>
                      {d.publishedAt ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Button asChild variant="ghost" size="icon" title="Edit">
                        <Link to={`/admin/devotionals/${d.id}`}><Edit2 className="h-4 w-4" /></Link>
                      </Button>
                      <button
                        onClick={() => publishMutation.mutate(d.id)}
                        disabled={publishMutation.isPending}
                        title={d.publishedAt ? 'Unpublish' : 'Publish'}
                        className="p-2 rounded-xl hover:bg-gold/10 text-[#7A7A6A] hover:text-gold transition-colors"
                      >
                        {d.publishedAt ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(d.id, d.title)}
                        disabled={deleteMutation.isPending}
                        title="Delete"
                        className="p-2 rounded-xl hover:bg-red-50 text-[#7A7A6A] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {items.length === 0 && (
            <div className="text-center py-12 text-[#7A7A6A] text-sm">
              No devotionals yet.{' '}
              <Link to="/admin/devotionals/new" className="text-gold hover:underline">Create the first one.</Link>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <span className="text-sm text-[#7A7A6A] self-center">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  )
}
