import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth.service'
import type { LoginFormData } from '@/types'

export function useAuth() {
  const queryClient = useQueryClient()
  const navigate    = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'me'],
    queryFn:  authService.getMe,
    enabled:  authService.isAuthenticated(),
    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] })
      navigate('/admin')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear()
      navigate('/admin/login')
    },
  })

  return {
    user:      data?.data ?? null,
    isLoading,
    isAuthenticated: authService.isAuthenticated(),
    login:  loginMutation.mutate,
    logout: logoutMutation.mutate,
    loginError:   loginMutation.error,
    loginPending: loginMutation.isPending,
  }
}
