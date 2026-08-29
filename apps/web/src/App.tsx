import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { PageLoader } from '@/components/ui/LoadingSpinner'
import { ProtectedRoute } from '@/components/features/ProtectedRoute'

// ── Lazy-loaded public pages ───────────────────────────────
const HomePage        = lazy(() => import('@/pages/HomePage'))
const AboutPage       = lazy(() => import('@/pages/AboutPage'))
const DevotionalsPage = lazy(() => import('@/pages/DevotionalsPage'))
const DevotionalPage  = lazy(() => import('@/pages/DevotionalPage'))
const PillarsPage     = lazy(() => import('@/pages/PillarsPage'))
const PrayerPage      = lazy(() => import('@/pages/PrayerPage'))
const CommunityPage   = lazy(() => import('@/pages/CommunityPage'))
const ResourcesPage   = lazy(() => import('@/pages/ResourcesPage'))
const ContactPage     = lazy(() => import('@/pages/ContactPage'))
const SearchPage      = lazy(() => import('@/pages/SearchPage'))
const PrivacyPage     = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage       = lazy(() => import('@/pages/TermsPage'))
const NotFoundPage    = lazy(() => import('@/pages/NotFoundPage'))

// ── Lazy-loaded admin pages ────────────────────────────────
const AdminLoginPage        = lazy(() => import('@/pages/admin/AdminLoginPage'))
const AdminDashboardPage    = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const AdminDevotionalsPage  = lazy(() => import('@/pages/admin/AdminDevotionalsPage'))
const AdminDevotionalEditor = lazy(() => import('@/pages/admin/AdminDevotionalEditor'))
const AdminPrayerPage       = lazy(() => import('@/pages/admin/AdminPrayerPage'))
const AdminMessagesPage     = lazy(() => import('@/pages/admin/AdminMessagesPage'))
const AdminSubscribersPage  = lazy(() => import('@/pages/admin/AdminSubscribersPage'))
const AdminStoriesPage      = lazy(() => import('@/pages/admin/AdminStoriesPage'))

// ── Public layout wrapper (Navbar + Outlet + Footer) ──────
function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ── Public routes (all wrapped in PublicLayout) ── */}
        <Route element={<PublicLayout />}>
          <Route index                     element={<HomePage />} />
          <Route path="about"              element={<AboutPage />} />
          <Route path="devotionals"        element={<DevotionalsPage />} />
          <Route path="devotionals/today"  element={<Navigate to="/devotionals" replace />} />
          <Route path="devotionals/:slug"  element={<DevotionalPage />} />
          <Route path="pillars"            element={<PillarsPage />} />
          <Route path="prayer"             element={<PrayerPage />} />
          <Route path="community"          element={<CommunityPage />} />
          <Route path="resources"          element={<ResourcesPage />} />
          <Route path="contact"            element={<ContactPage />} />
          <Route path="search"             element={<SearchPage />} />
          <Route path="privacy"            element={<PrivacyPage />} />
          <Route path="terms"              element={<TermsPage />} />
          <Route path="*"                  element={<NotFoundPage />} />
        </Route>

        {/* ── Admin login (no layout) ───────────────────── */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminLoginPage />
            </Suspense>
          }
        />

        {/* ── Admin dashboard (protected + admin layout) ── */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route index                    element={<AdminDashboardPage />} />
                    <Route path="devotionals"       element={<AdminDevotionalsPage />} />
                    <Route path="devotionals/new"   element={<AdminDevotionalEditor />} />
                    <Route path="devotionals/:id"   element={<AdminDevotionalEditor />} />
                    <Route path="prayer-requests"   element={<AdminPrayerPage />} />
                    <Route path="messages"          element={<AdminMessagesPage />} />
                    <Route path="subscribers"       element={<AdminSubscribersPage />} />
                    <Route path="stories"           element={<AdminStoriesPage />} />
                  </Routes>
                </Suspense>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Suspense>
  )
}
