import { useQuery } from '@tanstack/react-query'
import { Mail, Download } from 'lucide-react'
import { apiClient } from '@/lib/axios'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDateShort } from '@/lib/utils'
import type { ApiResponse, NewsletterSubscriber } from '@/types'

export default function AdminSubscribersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'subscribers'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<NewsletterSubscriber[]>>('/admin/subscribers')
      return res.data
    },
  })

  const subscribers = data?.data ?? []
  const active = subscribers.filter(s => s.status === 'ACTIVE').length

  const handleExportCSV = () => {
    const header = 'Email,Status,Source,Subscribed At\n'
    const rows = subscribers
      .map(s => `${s.email},${s.status},${s.source},${s.subscribedAt}`)
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `freshmercy-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-forest">Subscribers</h1>
          <p className="text-sm text-[#7A7A6A] mt-1">
            {active} active · {subscribers.length} total
          </p>
        </div>
        <Button variant="outline" size="md" onClick={handleExportCSV} disabled={subscribers.length === 0}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-2xl bg-parchment border border-gold/10 h-64 animate-pulse" />
      ) : subscribers.length === 0 ? (
        <div className="text-center py-16 text-[#7A7A6A]">
          <Mail className="h-10 w-10 text-gold/40 mx-auto mb-4" />
          <p>No subscribers yet.</p>
        </div>
      ) : (
        <div className="bg-parchment rounded-2xl border border-gold/15 overflow-hidden">
          <table className="w-full text-sm" aria-label="Subscribers list">
            <thead>
              <tr className="border-b border-gold/15 text-[10px] font-bold tracking-wider uppercase text-[#7A7A6A]">
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Source</th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">Subscribed</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-gold/10 hover:bg-cream/60 transition-colors">
                  <td className="px-5 py-3 font-medium text-forest">{s.email}</td>
                  <td className="px-5 py-3 text-[#7A7A6A] hidden md:table-cell">{s.source}</td>
                  <td className="px-5 py-3 text-[#7A7A6A] hidden lg:table-cell">
                    {formatDateShort(s.subscribedAt)}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={s.status === 'ACTIVE' ? 'forest' : 'default'}>
                      {s.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
