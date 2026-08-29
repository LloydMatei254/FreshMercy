import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authService } from '@/services/auth.service'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()

  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
