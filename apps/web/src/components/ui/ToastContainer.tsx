import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Toast } from '@/hooks/useToast'

interface ToastContainerProps {
  toasts: Toast[]
  removeToast: (id: string) => void
}

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  error:   <XCircle    className="h-5 w-5 text-red-500" />,
  info:    <Info       className="h-5 w-5 text-gold" />,
}

const styles = {
  success: 'border-green-200 bg-green-50 text-green-900',
  error:   'border-red-200  bg-red-50   text-red-900',
  info:    'border-gold/30  bg-cream    text-forest',
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  if (!toasts.length) return null
  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lifted animate-fade-up',
            styles[toast.type],
          )}
          role="alert"
        >
          <span className="mt-0.5 shrink-0">{icons[toast.type]}</span>
          <p className="flex-1 text-sm leading-snug">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 mt-0.5 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
