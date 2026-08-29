import { type ReactNode } from 'react'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      {icon && (
        <div className="mb-6 text-gold/50 text-6xl" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-xl text-forest mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#7A7A6A] max-w-sm leading-relaxed mb-6">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
