import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, CheckCircle } from 'lucide-react'
import { newsletterService } from '@/services/newsletter.service'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})
type FormData = z.infer<typeof schema>

interface NewsletterFormProps {
  source?: string
  variant?: 'inline' | 'stacked'
  className?: string
}

export function NewsletterForm({
  source = 'website',
  variant = 'inline',
  className,
}: NewsletterFormProps) {
  const [status, setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await newsletterService.subscribe(data.email, source)
      if (res.success) {
        setStatus('success')
        setMessage('You are subscribed! Fresh mercy every morning.')
        reset()
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Unable to subscribe right now. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 text-green-700 bg-green-50 border border-green-200 rounded-2xl px-6 py-4 ${className}`}>
        <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
        <p className="text-sm font-semibold">{message}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Newsletter subscription"
      className={className}
      noValidate
    >
      <div className={variant === 'inline' ? 'flex gap-2 flex-wrap items-start' : 'flex flex-col gap-3'}>
        <div className={variant === 'inline' ? 'flex-1 min-w-[220px]' : 'w-full'}>
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
            disabled={status === 'loading'}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={status === 'loading'}
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Get Daily Mercy
        </Button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-2" role="alert">{message}</p>
      )}
    </form>
  )
}
