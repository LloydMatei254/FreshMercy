import { Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { PageLoader } from '@/components/ui/LoadingSpinner'
import { ProtectedRoute } from '@/components/features/ProtectedRoute'
import { ErrorBoundary } from '@/components/features/ErrorBoundary'

// ── Direct (non-lazy) imports — avoids silent Suspense failures ──
import HomePage        from '@/pages/HomePage'
import AboutPage       from '@/pages/AboutPage'
import DevotionalsPage from '@/pages/DevotionalsPage'
import DevotionalPage  from '@/pages/DevotionalPage'
import PillarsPage     from '@/pages/PillarsPage'
import PrayerPage      from '@/pages/PrayerPage'
import CommunityPage   from '@/pages/CommunityPage'
import ResourcesPage   from '@/pages/ResourcesPage'
import ContactPage     from '@/pages/ContactPage'
import SearchPage      from '@/pages/SearchPage'
import PrivacyPage     from '@/pages/PrivacyPage'
import TermsPage       from '@/pages/TermsPage'
import NotFoundPage    from '@/pages/NotFoundPage'

import AdminLoginPage        from '@/pages/admin/AdminLoginPage'
import AdminDashboardPage    from '@/pages/admin/AdminDashboardPage'
import AdminDevotionalsPage  from '@/pages/admin/AdminDevotionalsPage'
import AdminDevotionalEditor from '@/pages/admin/AdminDevotionalEditor'
import AdminPrayerPage       from '@/pages/admin/AdminPrayerPage'
import AdminMessagesPage     from '@/pages/admin/AdminMessagesPage'
import AdminSubscribersPage  from '@/pages/admin/AdminSubscribersPage'
import AdminStoriesPage      from '@/pages/admin/AdminStoriesPage'

// ── Wrap each page in an error boundary ───────────────────
function Page({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

// ── Public layout: Navbar + page content + Footer ─────────
function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* pt-16 ensures content is never hidden behind the fixed navbar */}
      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* ── Public pages ──────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route index            element={<Page><HomePage /></Page>} />
        <Route path="about"     element={<Page><AboutPage /></Page>} />
        <Route path="devotionals"
                                element={<Page><DevotionalsPage /></Page>} />
        <Route path="devotionals/today"
                                element={<Navigate to="/devotionals" replace />} />
        <Route path="devotionals/:slug"
                                element={<Page><DevotionalPage /></Page>} />
        <Route path="pillars"   element={<Page><PillarsPage /></Page>} />
        <Route path="prayer"    element={<Page><PrayerPage /></Page>} />
        <Route path="community" element={<Page><CommunityPage /></Page>} />
        <Route path="resources" element={<Page><ResourcesPage /></Page>} />
        <Route path="contact"   element={<Page><ContactPage /></Page>} />
        <Route path="search"    element={<Page><SearchPage /></Page>} />
        <Route path="privacy"   element={<Page><PrivacyPage /></Page>} />
        <Route path="terms"     element={<Page><TermsPage /></Page>} />
        <Route path="*"         element={<Page><NotFoundPage /></Page>} />
      </Route>

      {/* ── Admin login (full screen, no public layout) ── */}
      <Route path="/admin/login"
             element={<Page><AdminLoginPage /></Page>} />

      {/* ── Admin area (protected) ────────────────────── */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route index
                         element={<Page><AdminDashboardPage /></Page>} />
                  <Route path="devotionals"
                         element={<Page><AdminDevotionalsPage /></Page>} />
                  <Route path="devotionals/new"
                         element={<Page><AdminDevotionalEditor /></Page>} />
                  <Route path="devotionals/:id"
                         element={<Page><AdminDevotionalEditor /></Page>} />
                  <Route path="prayer-requests"
                         element={<Page><AdminPrayerPage /></Page>} />
                  <Route path="messages"
                         element={<Page><AdminMessagesPage /></Page>} />
                  <Route path="subscribers"
                         element={<Page><AdminSubscribersPage /></Page>} />
                  <Route path="stories"
                         element={<Page><AdminStoriesPage /></Page>} />
                </Routes>
              </Suspense>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
