import { type ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Mail,
  Heart,
  MessageSquare,
  Users,
  Star,
  LogOut,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

const adminNav = [
  { label: 'Dashboard',      to: '/admin',                  icon: LayoutDashboard, end: true },
  { label: 'Devotionals',    to: '/admin/devotionals',      icon: BookOpen },
  { label: 'Prayer Requests',to: '/admin/prayer-requests',  icon: Heart },
  { label: 'Messages',       to: '/admin/messages',         icon: MessageSquare },
  { label: 'Subscribers',    to: '/admin/subscribers',      icon: Mail },
  { label: 'Stories',        to: '/admin/stories',          icon: Star },
  { label: 'Users',          to: '/admin/users',            icon: Users },
  { label: 'Settings',       to: '/admin/settings',         icon: Settings },
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-forest text-cream flex flex-col shadow-lifted" aria-label="Admin navigation">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-cream/10">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-serif font-black text-lg tracking-widest text-cream">FRESH</span>
            <span className="font-script italic text-xl text-gold leading-none">Mercy</span>
          </Link>
          <p className="text-[10px] tracking-widest uppercase text-cream/40 mt-0.5">Admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
          {adminNav.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-gold text-forest'
                    : 'text-cream/70 hover:bg-cream/10 hover:text-cream',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User / Logout */}
        <div className="px-3 py-4 border-t border-cream/10">
          {user && (
            <div className="px-4 py-2 mb-2">
              <p className="text-xs font-bold text-cream truncate">{user.name}</p>
              <p className="text-[10px] text-cream/40 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-cream/60 hover:bg-cream/10 hover:text-cream transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  )
}
