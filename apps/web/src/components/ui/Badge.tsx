import { type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase transition-colors',
  {
    variants: {
      variant: {
        default:  'bg-gold/20 text-forest border border-gold/30',
        gold:     'bg-gold text-forest',
        forest:   'bg-forest text-cream',
        olive:    'bg-olive/20 text-olive border border-olive/30',
        featured: 'bg-gold text-forest',
        new:      'bg-green-100 text-green-800 border border-green-200',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
