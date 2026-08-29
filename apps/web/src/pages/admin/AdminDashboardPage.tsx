import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { BookOpen, Heart, Mail, MessageSquare, Star, TrendingUp } from 'lucide-react'
import { apiClient } from '@/lib/axios'
import type { ApiResponse, DashboardMetrics } from '@/types'

function useDashboardMetrics() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<DashboardMetrics>>('/admin/dashboard')
      return res.data
    },
  })
}

interface MetricCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  to?: string
  highlight?: boolean
}

function MetricCard({ label, value, icon, to, highlight }: MetricCardProps) {
  const inner = (
    <div className={`
      rounded-2xl border p-6 flex items-start gap-4 transition-all duration-200
      ${highlight
        ? 'bg-forest text-cream border-forest'
        : 'bg-parchment border-gold/15 hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-card'
      }
    `}>
      <div className={`p-2.5 rounded-xl ${highlight ? 'bg-gold/20 text-gold' : 'bg-gold/10 text-gold'}`}>
        {icon}
      </div>
      <div>
        <p className={`text-3xl font-serif font-bold ${highlight ? 'text-cream' : 'text-forest'}`}>
          {value}
        </p>
        <p className={`text-xs font-bold tracking-wider uppercase mt-0.5 ${highlight ? 'text-cream/60' : 'text-[#7A7A6A]'}`}>
          {label}
        </p>
      </div>
    </div>
  )

  return to ? <Link to={to}>{inner}</Link> : inner
}

export default function AdminDashboardPage() {
  const { data, isLoading } = useDashboardMetrics()
  const metrics = data?.data

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-forest">Dashboard</h1>
        <p className="text-sm text-[#7A7A6A] mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-parchment border border-gold/10 p-6 animate-pulse h-28" />
          ))
        ) : (
          <>
            <MetricCard
              label="Published Devotionals"
              value={metrics?.publishedDevotionals ?? 0}
              icon={<BookOpen className="h-5 w-5" />}
              to="/admin/devotionals"
              highlight
            />
            <MetricCard
              label="Total Subscribers"
              value={metrics?.totalSubscribers ?? 0}
              icon={<Mail className="h-5 w-5" />}
              to="/admin/subscribers"
            />
            <MetricCard
              label="New Prayer Requests"
              value={metrics?.newPrayerRequests ?? 0}
              icon={<Heart className="h-5 w-5" />}
              to="/admin/prayer-requests"
            />
            <MetricCard
              label="Unread Messages"
              value={metrics?.unreadMessages ?? 0}
              icon={<MessageSquare className="h-5 w-5" />}
              to="/admin/messages"
            />
            <MetricCard
              label="Stories Pending"
              value={metrics?.pendingStories ?? 0}
              icon={<Star className="h-5 w-5" />}
              to="/admin/stories"
            />
            <MetricCard
              label="Total Devotionals"
              value={metrics?.totalDevotionals ?? 0}
              icon={<TrendingUp className="h-5 w-5" />}
              to="/admin/devotionals"
            />
          </>
        )}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-serif text-xl text-forest mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/devotionals/new"
            className="flex items-center gap-2 bg-gold text-forest font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-gold-500 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            New Devotional
          </Link>
          <Link
            to="/admin/prayer-requests"
            className="flex items-center gap-2 bg-parchment text-forest border border-gold/20 font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full hover:border-gold/40 transition-colors"
          >
            <Heart className="h-4 w-4" />
            View Prayer Requests
          </Link>
          <Link
            to="/admin/messages"
            className="flex items-center gap-2 bg-parchment text-forest border border-gold/20 font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full hover:border-gold/40 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            View Messages
          </Link>
        </div>
      </div>
    </div>
  )
}
