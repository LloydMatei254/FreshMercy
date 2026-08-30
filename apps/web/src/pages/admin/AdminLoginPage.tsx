import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SEO } from '@/components/features/SEO'
import type { LoginFormData } from '@/types'

const schema = z.object({
  email:    z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export default function AdminLoginPage() {
  const { login, loginPending, loginError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: LoginFormData) => login(data)

  return (
    <>
      <SEO title="Admin Login" noIndex />
      <div className="min-h-screen bg-forest flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-baseline gap-1">
              <span className="font-serif font-black text-2xl tracking-widest text-cream">FRESH</span>
              <span className="font-script italic text-3xl text-gold leading-none">Mercy</span>
            </Link>
            <p className="text-cream/50 text-xs tracking-widest uppercase mt-2">Admin Dashboard</p>
          </div>

          {/* Form */}
          <div className="bg-cream rounded-2xl p-8 shadow-lifted">
            <h1 className="font-serif text-xl text-forest mb-6 text-center">Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col gap-4">
                <Input
                  id="admin-email"
                  type="email"
                  label="Email Address"
                  placeholder="admin@freshmercy.org"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  id="admin-password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  error={errors.password?.message}
                  {...register('password')}
                />
                {loginError && (
                  <p className="text-xs text-red-500 text-center" role="alert">
                    {(loginError as { response?: { data?: { error?: { message?: string } } } })
                      ?.response?.data?.error?.message ?? 'Invalid email or password'}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loginPending}
                  className="w-full mt-2"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>

          <p className="text-center mt-6 text-xs text-cream/40">
            <Link to="/" className="hover:text-cream transition-colors">
              ← Back to Fresh Mercy
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
